import type { Report } from "akasha/story/chapter/narration/modules/report/narration-report.module.code.ts"
import { type RefObject, useCallback, useEffect, useRef, useState } from "react"

export const NUDGE_AFTER_MS = 20_000

export const REOPEN_AFTER_MS = 120_000

export const REOPENS = 3

const FIRST_WAIT_MS = 2000

const HEALED_SECONDS = 10

export const UNREACHABLE_GRACE_MS = 20_000

const LOST = new Set([404, 410])

const UNREACHABLE = new Set([502, 503, 504])

export type Answered = "fine" | "lost" | "unreachable"

export function answerOf(status: number | null): Answered {
  if (status === null || UNREACHABLE.has(status)) return "unreachable"
  return LOST.has(status) ? "lost" : "fine"
}

export function brokenAfter(
  said: Answered,
  since: number | null,
  now: number
): { readonly broken: boolean; readonly since: number | null } {
  if (said === "lost") return { broken: true, since: null }
  if (said === "fine") return { broken: false, since: null }
  const from = since ?? now
  return { broken: now - from >= UNREACHABLE_GRACE_MS, since: from }
}

export function streamLost(fatal: boolean, code: number | undefined): boolean {
  return fatal || (code !== undefined && LOST.has(code))
}

export type Told<T extends object> = (playing: T, status: number | null) => boolean

export function useLostSession<T extends object>(
  audio: RefObject<HTMLAudioElement | null>,
  broken: (why: string) => undefined,
  session: RefObject<T | null>
): Told<T> {
  const since = useRef<number | null>(null)
  const lost = useRef(new WeakSet<T>())
  return useCallback(
    (playing: T, status: number | null): boolean => {
      const said = answerOf(status)
      if (session.current !== playing || lost.current.has(playing)) return said === "lost"
      const after = brokenAfter(said, since.current, Date.now())
      since.current = after.since
      if (!after.broken || audio.current?.paused !== false) return said === "lost"
      lost.current.add(playing)
      since.current = null
      broken("The speech workload lost the narration.")
      return said === "lost"
    },
    [audio, broken, session]
  )
}

export type Steering = {
  readonly live: () => boolean
  readonly nudge: () => undefined
  readonly keep: () => undefined
  readonly reopen: () => undefined
  readonly giveUp: (why: string) => undefined
}

export type Recovering = {
  readonly reconnecting: boolean
  readonly broken: (why: string) => undefined
}

export const UNSTEERED: Steering = {
  live: () => false,
  nudge: () => undefined,
  keep: () => undefined,
  reopen: () => undefined,
  giveUp: () => undefined,
}

export function nudged(
  audio: HTMLAudioElement | null,
  loader: { readonly startLoad: (at: number) => void } | null
): undefined {
  if (audio === null) return
  const at = audio.currentTime
  if (loader !== null) loader.startLoad(at)
  else audio.currentTime = at
}

export function reopenWait(tried: number): number | null {
  return tried >= REOPENS ? null : FIRST_WAIT_MS * 2 ** tried
}

export function healed(from: number | null, at: number): boolean {
  return from !== null && at - from >= HEALED_SECONDS
}

export function useRecovery(
  audio: RefObject<HTMLAudioElement | null>,
  steering: RefObject<Steering>,
  report: Report
): Recovering {
  const [reconnecting, setReconnecting] = useState(false)
  const tried = useRef(0)
  const healedFrom = useRef<number | null>(null)
  const heardAt = useRef(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const reopening = useRef<ReturnType<typeof setTimeout> | null>(null)

  const calm = useCallback((): undefined => {
    for (const timer of timers.current) clearTimeout(timer)
    timers.current = []
  }, [])

  const broken = useCallback(
    (why: string): undefined => {
      if (reopening.current !== null) return
      calm()
      const steer = steering.current
      if (!steer.live()) return
      report("broken", { why })
      const wait = reopenWait(tried.current)
      if (wait === null) {
        tried.current = 0
        setReconnecting(false)
        report("give-up", { why })
        steer.giveUp(why)
        return
      }
      tried.current += 1
      healedFrom.current = null
      setReconnecting(true)
      steer.keep()
      reopening.current = setTimeout(() => {
        reopening.current = null
        report("reopen")
        steering.current.reopen()
      }, wait)
    },
    [calm, steering, report]
  )

  useEffect(() => {
    const element = audio.current
    if (element === null) return
    const waiting = (): undefined => {
      calm()
      if (!steering.current.live() || element.paused) return
      timers.current.push(
        setTimeout(() => {
          if (!steering.current.live()) return
          report("nudge")
          steering.current.nudge()
        }, NUDGE_AFTER_MS)
      )
      timers.current.push(
        setTimeout(() => broken("The narration stopped arriving."), REOPEN_AFTER_MS)
      )
    }
    const heard = (): undefined => {
      const at = element.currentTime
      if (at === heardAt.current) return
      heardAt.current = at
      calm()
      if (healedFrom.current === null) healedFrom.current = at
      else if (healed(healedFrom.current, at)) tried.current = 0
    }
    const playing = (): undefined => {
      setReconnecting(false)
    }
    const errored = (): undefined => {
      if (!steering.current.live()) return
      const code = element.error?.code ?? "unknown"
      broken(`The audio failed: ${element.error?.message || `code ${code}`}`)
    }
    const listened: [string, () => undefined][] = [
      ["waiting", waiting],
      ["timeupdate", heard],
      ["playing", playing],
      ["pause", calm],
      ["error", errored],
    ]
    for (const [name, listener] of listened) element.addEventListener(name, listener)
    return () => {
      calm()
      if (reopening.current !== null) clearTimeout(reopening.current)
      reopening.current = null
      for (const [name, listener] of listened) element.removeEventListener(name, listener)
    }
  }, [audio, steering, calm, broken, report])

  return { reconnecting, broken }
}
