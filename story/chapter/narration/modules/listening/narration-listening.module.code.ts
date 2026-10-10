import { getNowPlayingCommands } from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import {
  COLLECTION_SHAPE,
  completionValues,
} from "akasha/page/core/modules/task-lifecycle/task-lifecycle.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import {
  type ChapterPlaced,
  chapterStarts,
} from "akasha/story/chapter/narration/modules/playhead/narration-playhead.module.code.ts"
import {
  KEEP_AHEAD_SECONDS,
  streamLost,
} from "akasha/story/chapter/narration/modules/recovery/narration-recovery.module.code.ts"
import type { Report } from "akasha/story/chapter/narration/modules/report/narration-report.module.code.ts"
import type { ChapterHeld } from "akasha/story/chapter/narration/modules/telling/narration-telling.module.code.ts"
import Hls, { type ErrorData } from "hls.js"
import { type RefObject, useCallback, useEffect, useRef, useState } from "react"

const SILENCE_SAMPLES = 400

const SILENCE_RATE = 8000

export const SKIP_SECONDS = 15

const HLS = "application/vnd.apple.mpegurl"

const HELD_AT_START = {
  startPosition: 0,
  liveSyncDurationCount: Number.MAX_SAFE_INTEGER,
  liveMaxLatencyDurationCount: Number.POSITIVE_INFINITY,
  liveDurationInfinity: true,
  maxBufferLength: KEEP_AHEAD_SECONDS,
  maxMaxBufferLength: KEEP_AHEAD_SECONDS * 2,
} as const

export function playsHlsItself(audio: HTMLAudioElement): boolean {
  return !Hls.isSupported() && audio.canPlayType(HLS) !== ""
}

function playingInBackground(): undefined {
  const said = (navigator as { audioSession?: { type: string } }).audioSession
  if (said !== undefined) said.type = "playback"
}

export function streamedInto(
  audio: HTMLAudioElement,
  url: string,
  broken: (from: Hls, why: string) => undefined,
  report: Report
): Hls | null {
  playingInBackground()
  if (playsHlsItself(audio)) {
    audio.src = url
    return null
  }
  const hls = new Hls(HELD_AT_START)
  hls.on(Hls.Events.ERROR, (_event: string, said: ErrorData) => {
    report("hls-error", { details: said.details, fatal: said.fatal })
    if (streamLost(said.fatal, said.response?.code))
      broken(hls, `The stream failed: ${said.details}`)
  })
  hls.loadSource(url)
  hls.attachMedia(audio)
  return hls
}

export const SPEEDS = [0.8, 1, 1.2, 1.4, 1.6, 1.8, 2] as const

const SPEED_KEPT_AS = "narration-speed"

export function speedAfter(speed: number): number {
  const at = (SPEEDS as readonly number[]).indexOf(speed)
  return SPEEDS[(at + 1) % SPEEDS.length] ?? 1
}

export function speedHeld(said: string | null): number {
  const speed = said === null ? Number.NaN : Number(said)
  return SPEEDS.find((one) => one === speed) ?? 1
}

export function speedShown(speed: number): string {
  return `${speed}×`
}

function paced(audio: HTMLAudioElement, speed: number): undefined {
  audio.defaultPlaybackRate = speed
  if (audio.playbackRate !== speed) audio.playbackRate = speed
  audio.preservesPitch = true
}

function speedKept(): number {
  try {
    return speedHeld(localStorage.getItem(SPEED_KEPT_AS))
  } catch {
    return 1
  }
}

function speedKeeping(speed: number): undefined {
  try {
    localStorage.setItem(SPEED_KEPT_AS, String(speed))
  } catch {
    console.error("[narration] this browser keeps no speed")
  }
}

export function useSpeed(audio: RefObject<HTMLAudioElement | null>): {
  readonly speed: number
  readonly faster: () => undefined
  readonly repace: () => undefined
} {
  const [speed, setSpeed] = useState(1)
  const pace = useRef(1)
  useEffect(() => setSpeed(speedKept()), [])
  useEffect(() => {
    pace.current = speed
    if (audio.current !== null) paced(audio.current, speed)
  }, [audio, speed])
  const faster = useCallback((): undefined => {
    setSpeed((was) => {
      const next = speedAfter(was)
      speedKeeping(next)
      return next
    })
  }, [])
  const repace = useCallback((): undefined => {
    if (audio.current !== null) paced(audio.current, pace.current)
  }, [audio])
  return { speed, faster, repace }
}

export function silenceWav(): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(44 + SILENCE_SAMPLES)
  const view = new DataView(bytes.buffer)
  const write = (at: number, said: string): undefined => {
    for (let one = 0; one < said.length; one += 1) bytes[at + one] = said.charCodeAt(one)
  }
  write(0, "RIFF")
  view.setUint32(4, 36 + SILENCE_SAMPLES, true)
  write(8, "WAVE")
  write(12, "fmt ")
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, SILENCE_RATE, true)
  view.setUint32(28, SILENCE_RATE, true)
  view.setUint16(32, 1, true)
  view.setUint16(34, 8, true)
  write(36, "data")
  view.setUint32(40, SILENCE_SAMPLES, true)
  bytes.fill(128, 44)
  return bytes
}

const FIRST_PIECE_TRIES = 40

const FIRST_PIECE_WAIT_MS = 500

const PIECE_LISTED = "#EXTINF"

export const JSON_SENT = { "content-type": "application/json" }

export async function firstPieceIn(
  fetching: (path: string) => Promise<Response>,
  playlist: string
): Promise<boolean> {
  for (let tried = 0; tried < FIRST_PIECE_TRIES; tried += 1) {
    const answered = await fetching(playlist)
    if (!answered.ok) return false
    if ((await answered.text()).includes(PIECE_LISTED)) return true
    await new Promise((settle) => setTimeout(settle, FIRST_PIECE_WAIT_MS))
  }
  return false
}

export async function bodyOf(answered: Response): Promise<Record<string, unknown>> {
  try {
    const said: unknown = await answered.json()
    return said !== null && typeof said === "object" ? (said as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

export function errorOf(body: Record<string, unknown>, status: number): string {
  const said = body.error
  return typeof said === "string" && said !== "" ? said : `the narration was answered ${status}`
}

export function heldOf(said: unknown): ChapterHeld | null {
  if (said === null || typeof said !== "object") return null
  const held = said as ChapterHeld
  return typeof held.id === "string" && typeof held.slug === "string" ? held : null
}

export function chapterHref(held: ChapterHeld): string {
  return buildPageHref({
    pageTypeSlug: toPageTypeSlug(held.pageTypeSlug),
    slug: held.slug,
    fallbackSlugSource: held.title,
    id: held.id,
  })
}

export function markRead(held: ChapterHeld | undefined): undefined {
  if (held === undefined || held.completedAt !== null) return
  void patchPage({
    pageTypeSlug: held.pageTypeSlug,
    where: [{ key: "id", eq: held.id }],
    set: completionValues(COLLECTION_SHAPE, { ownLength: held.ownLength }, Date.now()),
  }).catch((thrown: unknown) => {
    console.error(`[narration] ${held.slug} could not be marked read: ${saidBy(thrown)}`)
  })
}

export function progressWritten(held: ChapterHeld | undefined, ownProgress: number): undefined {
  if (held === undefined) return
  void patchPage({
    pageTypeSlug: held.pageTypeSlug,
    where: [{ key: "id", eq: held.id }],
    set: { [COLLECTION_SHAPE.progressKey]: ownProgress },
  }).catch((thrown: unknown) => {
    console.error(`[narration] ${held.slug} kept no progress: ${saidBy(thrown)}`)
  })
}

function mediaSession(): MediaSession | null {
  if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return null
  return navigator.mediaSession
}

export function nowPlayingOf(held: ChapterHeld | null): undefined {
  const media = mediaSession()
  if (media === null) return
  media.metadata =
    held === null
      ? null
      : new MediaMetadata({ title: held.title, artist: held.storyTitle, album: "Narration" })
}

export function nowPlayingControlled(controls: {
  readonly audio: () => HTMLAudioElement | null
  readonly placed: () => readonly ChapterPlaced[]
  readonly skip: (seconds: number) => undefined
  readonly seek: (seconds: number) => undefined
}): undefined {
  const media = mediaSession()
  if (media === null) return
  const { audio, placed, skip, seek } = controls
  const at = (): number => audio()?.currentTime ?? 0
  const handlers: [MediaSessionAction, MediaSessionActionHandler][] = [
    ["seekbackward", (asked) => skip(-(asked.seekOffset ?? SKIP_SECONDS))],
    ["seekforward", (asked) => skip(asked.seekOffset ?? SKIP_SECONDS)],
    ["seekto", (asked) => seek(asked.seekTime ?? at())],
    ["previoustrack", () => seek(chapterStarts(placed(), at(), -1) ?? 0)],
    [
      "nexttrack",
      () => {
        const next = chapterStarts(placed(), at(), 1)
        if (next !== null) seek(next)
      },
    ],
  ]
  for (const [action, handler] of handlers) {
    try {
      media.setActionHandler(action, handler)
    } catch {
      console.error(`[narration] this browser takes no ${action} handler`)
    }
  }
}

type Commanded = Pick<HTMLAudioElement, "paused" | "play" | "pause">

export function commandTaken(
  said: string,
  audio: Commanded | null,
  refused: (why: string) => undefined
): undefined {
  if (audio === null) return
  if (said === "pause" || (said === "toggle" && !audio.paused)) {
    audio.pause()
    return
  }
  if (said === "play" || said === "toggle") {
    void audio.play().catch((thrown: unknown) => refused(saidBy(thrown)))
  }
}

function lockScreenTaken(audio: () => HTMLAudioElement | null, report: Report): () => undefined {
  const commands = getNowPlayingCommands()
  if (commands === null) return () => undefined
  const refused = (why: string): undefined => report("lock-screen-play-refused", { why })
  const listening = commands.addListener("command", ({ command }) => {
    report("lock-screen-command", { command })
    commandTaken(command, audio(), refused)
  })
  void commands.claim().catch((thrown: unknown) => {
    console.error(`[narration] the app took no lock screen commands: ${saidBy(thrown)}`)
  })
  return () => {
    void Promise.resolve(listening).then((handle) => handle.remove())
    void commands.release().catch(() => undefined)
  }
}

export function useLockScreen(
  narrating: boolean,
  audio: RefObject<HTMLAudioElement | null>,
  report: Report
): undefined {
  useEffect(() => {
    if (!narrating) return
    return lockScreenTaken(() => audio.current, report)
  }, [narrating, audio, report])
}
