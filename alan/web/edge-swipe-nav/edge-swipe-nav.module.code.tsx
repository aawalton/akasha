import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { z } from "zod"

const EDGE_ZONE_PX = 24
const SWIPE_RESISTANCE = 0.5
const TRIGGER_THRESHOLD_PX = 64
const MAX_TRAVEL_PX = 96
const AXIS_LOCK_SLOP_PX = 8

type Side = "left" | "right"

const NAVIGATION_SCHEMA = z.object({ canGoForward: z.boolean() })

function canGoForward(): boolean {
  const parsed = NAVIGATION_SCHEMA.safeParse(Reflect.get(window, "navigation"))
  return parsed.success ? parsed.data.canGoForward : true
}

export function EdgeSwipeNav() {
  const [side, setSide] = useState<Side | null>(null)
  const [distance, setDistance] = useState(0)
  const sideRef = useRef<Side | null>(null)
  const committedRef = useRef(false)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const distanceRef = useRef(0)

  useEffect(() => {
    if (typeof navigator === "undefined" || navigator.maxTouchPoints <= 0) return

    const setActiveSide = (s: Side | null) => {
      sideRef.current = s
      setSide(s)
    }
    const setTravel = (d: number) => {
      distanceRef.current = d
      setDistance(d)
    }
    const reset = () => {
      committedRef.current = false
      setActiveSide(null)
      setTravel(0)
    }

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch === undefined) return
      if (touch.clientX <= EDGE_ZONE_PX) {
        setActiveSide("left")
      } else if (touch.clientX >= window.innerWidth - EDGE_ZONE_PX && canGoForward()) {
        setActiveSide("right")
      } else {
        setActiveSide(null)
        return
      }
      committedRef.current = false
      startXRef.current = touch.clientX
      startYRef.current = touch.clientY
      setTravel(0)
    }

    const onTouchMove = (e: TouchEvent) => {
      const activeSide = sideRef.current
      if (activeSide === null) return
      const touch = e.touches[0]
      if (touch === undefined) return
      const dx = touch.clientX - startXRef.current
      const dy = touch.clientY - startYRef.current
      const travel = activeSide === "left" ? dx : -dx
      if (!committedRef.current) {
        if (Math.abs(dx) < AXIS_LOCK_SLOP_PX && Math.abs(dy) < AXIS_LOCK_SLOP_PX) return
        if (Math.abs(dy) > Math.abs(dx) || travel <= 0) {
          reset()
          return
        }
        committedRef.current = true
      }
      e.preventDefault()
      setTravel(Math.min(Math.max(travel, 0) * SWIPE_RESISTANCE, MAX_TRAVEL_PX))
    }

    const onTouchEnd = () => {
      const activeSide = sideRef.current
      if (activeSide === null) return
      const triggered = committedRef.current && distanceRef.current >= TRIGGER_THRESHOLD_PX
      reset()
      if (triggered) {
        if (activeSide === "left") {
          window.history.back()
        } else {
          window.history.forward()
        }
      }
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("touchcancel", onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("touchcancel", onTouchEnd)
    }
  }, [])

  const visible = side !== null && distance > 0
  const armed = distance >= TRIGGER_THRESHOLD_PX

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
      className={`pointer-events-none fixed top-1/2 z-50 -translate-y-1/2 ${side === "right" ? "right-0" : "left-0"}`}
      style={{
        transform: `translateX(${side === "right" ? -distance : distance}px)`,
        opacity: visible ? 1 : 0,
      }}
    >
      {side === "right" ? (
        <ChevronRight
          aria-label="Forward"
          className={`size-6 ${armed ? "text-primary" : "text-secondary"}`}
        />
      ) : (
        <ChevronLeft
          aria-label="Back"
          className={`size-6 ${armed ? "text-primary" : "text-secondary"}`}
        />
      )}
    </div>
  )
}
