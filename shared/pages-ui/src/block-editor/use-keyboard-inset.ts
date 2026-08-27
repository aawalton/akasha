"use client"

import { useEffect, useState } from "react"

const FOCUS_SETTLE_DELAYS_MS = [50, 150, 300, 500, 700] as const

export function keyboardInsetFromViewport(
  viewport: { readonly height: number; readonly offsetTop: number } | null,
  layoutHeight: number
): number {
  if (viewport === null) return 0
  const inset = layoutHeight - viewport.height - viewport.offsetTop
  return inset > 0 ? inset : 0
}

export function useKeyboardInset(): number {
  const [inset, setInset] = useState(0)
  useEffect(() => {
    const vv = window.visualViewport
    if (vv === null || vv === undefined) return
    const update = () =>
      setInset(keyboardInsetFromViewport(vv, document.documentElement.clientHeight))
    let settleTimers: ReturnType<typeof setTimeout>[] = []
    const clearSettleTimers = () => {
      for (const t of settleTimers) clearTimeout(t)
      settleTimers = []
    }

    let rafId: number | null = null
    let lastHeight = vv.height
    let lastOffsetTop = vv.offsetTop
    const tick = () => {
      if (vv.height !== lastHeight || vv.offsetTop !== lastOffsetTop) {
        lastHeight = vv.height
        lastOffsetTop = vv.offsetTop
        update()
      }
      rafId = requestAnimationFrame(tick)
    }
    const startRaf = () => {
      if (rafId !== null) return
      lastHeight = vv.height
      lastOffsetTop = vv.offsetTop
      rafId = requestAnimationFrame(tick)
    }
    const stopRaf = () => {
      if (rafId === null) return
      cancelAnimationFrame(rafId)
      rafId = null
    }

    const onFocusIn = () => {
      clearSettleTimers()
      update()
      settleTimers = FOCUS_SETTLE_DELAYS_MS.map((ms) => setTimeout(update, ms))
      startRaf()
    }
    const onFocusOut = () => {
      update()
      stopRaf()
    }
    update()
    const target: EventTarget = vv
    const events = ["resize", "scroll", "geometrychange"] as const
    for (const e of events) target.addEventListener(e, update)
    window.addEventListener("focusin", onFocusIn)
    window.addEventListener("focusout", onFocusOut)
    return () => {
      clearSettleTimers()
      stopRaf()
      for (const e of events) target.removeEventListener(e, update)
      window.removeEventListener("focusin", onFocusIn)
      window.removeEventListener("focusout", onFocusOut)
    }
  }, [])
  return inset
}
