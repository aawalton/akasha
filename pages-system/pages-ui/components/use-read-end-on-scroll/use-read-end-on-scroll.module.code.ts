"use client"

import { clampFraction } from "@akasha/pages-ui-components/position-fraction"
import type { ReaderPositionAnchor } from "@akasha/pages-ui-components/reader-prose-body"
import { type RefObject, useEffect, useRef } from "react"

const READ_END_FRACTION_THRESHOLD = 0.98

const FITS_VIEWPORT_SCROLLABLE_PX = 4

export function readEndContentFraction(args: {
  scrollTop: number
  scrollable: number
  anchor: ReaderPositionAnchor | null
}): number {
  const { scrollTop, scrollable, anchor } = args
  if (anchor != null) return anchor.fractionAt(scrollTop)
  if (scrollable <= FITS_VIEWPORT_SCROLLABLE_PX) return 1
  return clampFraction(scrollTop / scrollable)
}

export function useReadEndOnScroll(args: {
  enabled: boolean
  onReadToEnd: (() => void) | undefined
  resetKey: string
  anchorRef: RefObject<ReaderPositionAnchor | null>
}): undefined {
  const { enabled, onReadToEnd, resetKey, anchorRef } = args
  const firedRef = useRef(false)
  const onReadToEndRef = useRef(onReadToEnd)

  useEffect(() => {
    onReadToEndRef.current = onReadToEnd
  }, [onReadToEnd])

  useEffect(() => {
    firedRef.current = false
  }, [resetKey])

  useEffect(() => {
    if (!enabled || onReadToEnd == null) return
    const check = () => {
      if (firedRef.current) return
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      const fraction = readEndContentFraction({
        scrollTop: doc.scrollTop,
        scrollable,
        anchor: anchorRef.current,
      })
      if (fraction >= READ_END_FRACTION_THRESHOLD) {
        firedRef.current = true
        onReadToEndRef.current?.()
      }
    }
    const raf = requestAnimationFrame(check)
    window.addEventListener("scroll", check, { passive: true })
    window.addEventListener("resize", check, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
    }
  }, [enabled, onReadToEnd, resetKey, anchorRef])
}
