import { Loader2, RefreshCw } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import {
  type ScrollableAncestor,
  shouldArm,
} from "../pull-to-refresh-decider/pull-to-refresh-decider.module.code.ts"

function collectScrollableAncestors(target: EventTarget | null): readonly ScrollableAncestor[] {
  const chain: ScrollableAncestor[] = []
  let node = target instanceof Element ? target : null
  while (node !== null) {
    const overflowY = getComputedStyle(node).overflowY
    if (
      (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") &&
      node.scrollHeight > node.clientHeight
    ) {
      chain.push({ scrollTop: node.scrollTop })
    }
    node = node.parentElement
  }
  return chain
}

function isFloatingMenuOpen(): boolean {
  return (
    typeof document !== "undefined" &&
    document.querySelector(
      '[data-radix-popper-content-wrapper], [role="menu"][data-state="open"]'
    ) !== null
  )
}

const PULL_RESISTANCE = 0.5
const TRIGGER_THRESHOLD_PX = 64
const MAX_PULL_PX = 96

export function PullToRefresh() {
  const [pullDistance, setPullDistance] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const armedRef = useRef(false)
  const startYRef = useRef(0)
  const distanceRef = useRef(0)
  const refreshingRef = useRef(false)
  const menuInvolvedRef = useRef(false)

  useEffect(() => {
    if (typeof navigator === "undefined" || navigator.maxTouchPoints <= 0) return

    const setDistance = (d: number) => {
      distanceRef.current = d
      setPullDistance(d)
    }

    const onTouchStart = (e: TouchEvent) => {
      menuInvolvedRef.current = false
      if (refreshingRef.current) return
      const touch = e.touches[0]
      if (touch === undefined) return
      if (shouldArm(collectScrollableAncestors(e.target), window.scrollY)) {
        armedRef.current = true
        startYRef.current = touch.clientY
      } else {
        armedRef.current = false
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!armedRef.current || refreshingRef.current) return
      const touch = e.touches[0]
      if (touch === undefined) return
      if (isFloatingMenuOpen()) {
        menuInvolvedRef.current = true
        armedRef.current = false
        setDistance(0)
        return
      }
      if (window.scrollY > 0) {
        armedRef.current = false
        setDistance(0)
        return
      }
      const rawDelta = touch.clientY - startYRef.current
      if (rawDelta <= 0) {
        setDistance(0)
        return
      }
      e.preventDefault()
      setDistance(Math.min(rawDelta * PULL_RESISTANCE, MAX_PULL_PX))
    }

    const onTouchEnd = () => {
      if (refreshingRef.current) return
      if (menuInvolvedRef.current || isFloatingMenuOpen()) {
        armedRef.current = false
        setDistance(0)
        return
      }
      if (!armedRef.current) return
      armedRef.current = false
      if (distanceRef.current >= TRIGGER_THRESHOLD_PX) {
        refreshingRef.current = true
        setRefreshing(true)
        window.location.reload()
        return
      }
      setDistance(0)
    }

    const onTouchCancel = () => {
      armedRef.current = false
      setDistance(0)
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("touchcancel", onTouchCancel, { passive: true })
    return () => {
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("touchcancel", onTouchCancel)
    }
  }, [])

  const visible = pullDistance > 0 || refreshing
  const armed = pullDistance >= TRIGGER_THRESHOLD_PX
  const progress = Math.min(pullDistance / TRIGGER_THRESHOLD_PX, 1)

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center"
      style={{
        transform: `translateY(${refreshing ? TRIGGER_THRESHOLD_PX : pullDistance}px)`,
        opacity: visible ? 1 : 0,
        transition: armed || refreshing ? "opacity 150ms ease-out" : undefined,
      }}
    >
      {refreshing ? (
        <Loader2 className="size-5 animate-spin text-primary" aria-label="Refreshing" />
      ) : (
        <RefreshCw
          aria-hidden
          className={`size-5 ${armed ? "text-primary" : "text-secondary"}`}
          style={{ transform: `rotate(${progress * 270}deg)` }}
        />
      )}
    </div>
  )
}
