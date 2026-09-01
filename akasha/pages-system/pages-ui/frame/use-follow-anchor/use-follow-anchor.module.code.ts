"use client"

import type { FrameFollowMode } from "@akasha/pages-ui/frame/frame-config"
import {
  computeAnchorBelowViewport,
  computePinned,
} from "@akasha/pages-ui/frame/viewport-thresholds"
import { type RefObject, useCallback, useEffect, useRef, useState } from "react"

const PIN_THRESHOLD_PX = 120

export interface UseFollowAnchorArgs {
  readonly anchorRef: RefObject<HTMLElement | null>
  readonly renderTrigger: unknown
  readonly forcePinSignal?: unknown
  readonly mode: FrameFollowMode | null
}

export interface UseFollowAnchorResult {
  readonly showJumpToLatest: boolean
  readonly jumpToLatest: () => void
}

export function useFollowAnchor({
  anchorRef,
  renderTrigger,
  forcePinSignal,
  mode,
}: UseFollowAnchorArgs): UseFollowAnchorResult {
  const enabled = mode !== null
  const pinnedRef = useRef(true)
  const [showJumpToLatest, setShowJumpToLatest] = useState(false)
  const mountedRef = useRef(false)

  const syncPinned = useCallback((pinned: boolean) => {
    pinnedRef.current = pinned
    setShowJumpToLatest(!pinned)
  }, [])

  const scrollToAnchor = useCallback(() => {
    const el = anchorRef.current
    if (el == null) return
    if (mode === "top") el.scrollIntoView({ block: "start", behavior: "smooth" })
    else el.scrollIntoView({ block: "end" })
  }, [anchorRef, mode])

  const jumpToLatest = useCallback(() => {
    syncPinned(true)
    scrollToAnchor()
  }, [scrollToAnchor, syncPinned])

  useEffect(() => {
    if (!enabled) return
    function onScroll() {
      if (mode === "top") {
        const el = anchorRef.current
        const anchorTop = el != null ? el.getBoundingClientRect().top : 0
        syncPinned(
          !computeAnchorBelowViewport({
            anchorTop,
            innerHeight: window.innerHeight,
            threshold: PIN_THRESHOLD_PX,
          })
        )
        return
      }
      const doc = document.documentElement
      syncPinned(
        computePinned({
          scrollHeight: doc.scrollHeight,
          scrollY: window.scrollY,
          innerHeight: window.innerHeight,
          threshold: PIN_THRESHOLD_PX,
        })
      )
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    if (mode === "top") onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [enabled, mode, anchorRef, syncPinned])

  useEffect(() => {
    if (!enabled) return
    if (mode === "top") {
      if (!mountedRef.current) {
        mountedRef.current = true
        return
      }
      scrollToAnchor()
      return
    }
    if (pinnedRef.current) scrollToAnchor()
  }, [renderTrigger, enabled, mode, scrollToAnchor])

  useEffect(() => {
    if (!enabled || mode === "top") return
    jumpToLatest()
  }, [forcePinSignal, enabled, mode, jumpToLatest])

  return { showJumpToLatest, jumpToLatest }
}
