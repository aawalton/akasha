"use client"

import { reportError } from "@akasha/errors-client/error-reporting"
import {
  decideReadRestore,
  fractionToScrollTop,
} from "@akasha/pages-ui-components/position-fraction"
import { type RefObject, useEffect, useRef, useState } from "react"

const LAYOUT_MAX_FRAMES = 30

const CONVERGENCE_MAX_APPLIES = 10

const CONVERGENCE_EPSILON_PX = 1

export const SETTLE_QUIET_MS = 220

const SETTLE_WATCH_MAX_FRAMES = 180

const REVEAL_TIMEOUT_MS = 2000

const USER_INTENT_EVENTS = ["wheel", "touchmove", "keydown"] as const

function reportRevealTimeout(): undefined {
  reportError({
    message: `reader-restore-reveal-timeout heldMs=${REVEAL_TIMEOUT_MS}`,
    stack:
      "reader-restore-reveal-timeout: virtualizer measurements did not quiesce before the bounded reveal gate; revealed anyway",
    kind: "error",
    app: "alanwalton-native",
    errorUserId: null,
  })
  return undefined
}

export function useRestoreReadPosition(args: {
  readonly ready: boolean
  readonly fraction: number | undefined
  readonly resetKey: string
  readonly suppressRef: RefObject<boolean>
  readonly resolveScrollTop?: (fraction: number) => number
  readonly holdEligible?: boolean
}): { readonly held: boolean } {
  const { ready, fraction, resetKey, suppressRef, holdEligible = false } = args
  const restoredRef = useRef(false)
  const fractionRef = useRef(fraction)
  const resolveRef = useRef(args.resolveScrollTop)

  const [revealedKey, setRevealedKey] = useState<string | null>(null)
  const held = holdEligible && revealedKey !== resetKey
  const holdEligibleRef = useRef(holdEligible)
  useEffect(() => {
    holdEligibleRef.current = holdEligible
  }, [holdEligible])

  useEffect(() => {
    if (!held) return
    if (typeof window === "undefined") return
    const timer = window.setTimeout(() => {
      reportRevealTimeout()
      setRevealedKey(resetKey)
    }, REVEAL_TIMEOUT_MS)
    return () => window.clearTimeout(timer)
  }, [held, resetKey])

  useEffect(() => {
    fractionRef.current = fraction
  }, [fraction])

  useEffect(() => {
    resolveRef.current = args.resolveScrollTop
  }, [args.resolveScrollTop])

  useEffect(() => {
    restoredRef.current = false
  }, [resetKey])

  useEffect(() => {
    if (!ready || restoredRef.current) return
    if (typeof window === "undefined") return

    const reveal = () => {
      if (holdEligibleRef.current) setRevealedKey(resetKey)
    }

    const target = decideReadRestore(fractionRef.current)
    if (target === undefined) {
      restoredRef.current = true
      reveal()
      return
    }

    restoredRef.current = true

    let raf = 0
    let frames = 0
    let applies = 0
    let watchFrames = 0
    let lastObserved = Number.NaN
    let quietSince = Number.NaN
    let lastApplied = Number.NaN
    let cancelled = false
    let listenersLive = false

    function removeListeners() {
      if (!listenersLive) return
      listenersLive = false
      for (const evt of USER_INTENT_EVENTS) {
        window.removeEventListener(evt, onUserIntent)
      }
    }

    function onUserIntent() {
      cancelled = true
      if (raf !== 0) cancelAnimationFrame(raf)
      removeListeners()
      scheduleRelease()
      reveal()
    }

    for (const evt of USER_INTENT_EVENTS) {
      window.addEventListener(evt, onUserIntent, { passive: true })
    }
    listenersLive = true

    function scheduleRelease() {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          suppressRef.current = false
        })
      })
    }

    const scrollableNow = (): number => {
      const doc = document.documentElement
      return doc.scrollHeight - doc.clientHeight
    }

    const resolve = (): number => {
      const resolver = resolveRef.current
      return resolver !== undefined
        ? resolver(target)
        : fractionToScrollTop(target, scrollableNow())
    }

    const settleWatch = () => {
      if (cancelled) return
      const observed = document.documentElement.scrollTop
      const now = performance.now()
      if (Number.isNaN(quietSince) || Math.abs(observed - lastObserved) > CONVERGENCE_EPSILON_PX) {
        lastObserved = observed
        quietSince = now
      }
      if (now - quietSince >= SETTLE_QUIET_MS || watchFrames >= SETTLE_WATCH_MAX_FRAMES) {
        removeListeners()
        scheduleRelease()
        reveal()
        return
      }
      watchFrames += 1
      raf = requestAnimationFrame(settleWatch)
    }

    const converge = () => {
      if (cancelled) return
      const next = resolve()
      const isFirst = Number.isNaN(lastApplied)
      if (isFirst || Math.abs(next - lastApplied) > CONVERGENCE_EPSILON_PX) {
        if (applies >= CONVERGENCE_MAX_APPLIES) {
          removeListeners()
          scheduleRelease()
          reveal()
          return
        }
        applies += 1
        suppressRef.current = true
        window.scrollTo(0, next)
        lastApplied = next
        raf = requestAnimationFrame(converge)
        return
      }
      settleWatch()
    }

    const tick = () => {
      if (cancelled) return
      if (scrollableNow() > 0) {
        converge()
        return
      }
      if (frames >= LAYOUT_MAX_FRAMES) {
        removeListeners()
        reveal()
        return
      }
      frames += 1
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      if (raf !== 0) cancelAnimationFrame(raf)
      removeListeners()
    }
  }, [ready, resetKey, suppressRef])

  return { held }
}
