import { type RefObject, useCallback, useEffect } from "react"

type Reported = Readonly<Record<string, string | number | boolean | null>>

export type Report = (event: string, more?: Reported) => undefined

type Held = readonly (readonly [number, number])[]

const REPORTED = [
  "waiting",
  "stalled",
  "suspend",
  "error",
  "ended",
  "emptied",
  "abort",
  "pause",
  "play",
  "playing",
] as const

const NEAR_SECONDS = 0.5

const FED_BY_PAGE = "blob:"

function rounded(seconds: number): number {
  return Number(seconds.toFixed(1))
}

export function heldAhead(held: Held, at: number): number {
  const holding = held.find(([start, end]) => start <= at + NEAR_SECONDS && end >= at)
  return holding === undefined ? 0 : rounded(holding[1] - at)
}

function heldOf(ranges: TimeRanges): Held {
  return Array.from({ length: ranges.length }, (_, n) => [ranges.start(n), ranges.end(n)] as const)
}

export function heldAheadOf(audio: HTMLAudioElement): number {
  return heldAhead(heldOf(audio.buffered), audio.currentTime)
}

export function seekableEnd(audio: HTMLAudioElement): number {
  const ranges = audio.seekable
  return ranges.length === 0 ? 0 : ranges.end(ranges.length - 1)
}

function stateOf(audio: HTMLAudioElement): Reported {
  const held = heldOf(audio.buffered)
  const last = heldOf(audio.seekable).at(-1)
  return {
    at: rounded(audio.currentTime),
    heldAhead: heldAhead(held, audio.currentTime),
    heldRanges: held.length,
    seekableEnd: last === undefined ? null : rounded(last[1]),
    rate: audio.playbackRate,
    paused: audio.paused,
    readyState: audio.readyState,
    networkState: audio.networkState,
    errorCode: audio.error?.code ?? null,
    errorMessage: audio.error?.message || null,
    hidden: document.hidden,
    fedByPage: audio.src.startsWith(FED_BY_PAGE),
  }
}

export function useNarrationReport(
  audio: RefObject<HTMLAudioElement | null>,
  fetching: (path: string, init?: RequestInit) => Promise<Response>,
  session: RefObject<{ readonly id: string } | null>,
  silence: RefObject<string | null>
): Report {
  const report = useCallback(
    (event: string, more?: Reported): undefined => {
      const element = audio.current
      const playing = session.current
      if (element === null || playing === null || element.src === silence.current) return
      void fetching(`/api/narration/${playing.id}/report`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        keepalive: true,
        body: JSON.stringify({ event, ...stateOf(element), ...more }),
      }).catch(() => undefined)
    },
    [audio, fetching, session, silence]
  )
  useEffect(() => {
    const element = audio.current
    if (element === null) return
    const listened = REPORTED.map((name) => [name, (): undefined => report(name)] as const)
    const shown = (): undefined => report(document.hidden ? "hidden" : "shown")
    for (const [name, listener] of listened) element.addEventListener(name, listener)
    document.addEventListener("visibilitychange", shown)
    return () => {
      for (const [name, listener] of listened) element.removeEventListener(name, listener)
      document.removeEventListener("visibilitychange", shown)
    }
  }, [audio, report])
  return report
}
