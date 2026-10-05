import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import {
  COLLECTION_SHAPE,
  completionValues,
} from "akasha/page/core/modules/task-lifecycle/task-lifecycle.module.code.ts"
import {
  type ChapterPlaced,
  chapterStarts,
} from "akasha/story/chapter/narration/modules/playhead/narration-playhead.module.code.ts"
import type { ChapterHeld } from "akasha/story/chapter/narration/modules/telling/narration-telling.module.code.ts"

const SILENCE_SAMPLES = 400

const SILENCE_RATE = 8000

export const SKIP_SECONDS = 15

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

export function seekableEnd(audio: HTMLAudioElement): number {
  const ranges = audio.seekable
  return ranges.length === 0 ? 0 : ranges.end(ranges.length - 1)
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
    [
      "play",
      () =>
        void audio()
          ?.play()
          .catch(() => undefined),
    ],
    ["pause", () => audio()?.pause()],
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
