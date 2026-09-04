"use client"

import { decideReadEndFire } from "@akasha/pages-ui-components/read-end"
import { type RefCallback, useCallback, useEffect, useRef, useState } from "react"

export function useReadEndObserver(args: {
  enabled: boolean
  onReadToEnd: (() => void) | undefined
  resetKey: string
}): RefCallback<HTMLDivElement> {
  const { enabled, onReadToEnd, resetKey } = args
  const [sentinel, setSentinel] = useState<HTMLDivElement | null>(null)
  const firedRef = useRef(false)
  const onReadToEndRef = useRef(onReadToEnd)

  useEffect(() => {
    onReadToEndRef.current = onReadToEnd
  }, [onReadToEnd])

  useEffect(() => {
    firedRef.current = false
  }, [resetKey])

  useEffect(() => {
    if (!enabled || onReadToEnd == null || sentinel == null) return
    const observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries.some((entry) => entry.isIntersecting)
      if (
        decideReadEndFire({
          markReadOnEnd: enabled,
          hasCallback: onReadToEndRef.current != null,
          isIntersecting,
          alreadyFired: firedRef.current,
        })
      ) {
        firedRef.current = true
        onReadToEndRef.current?.()
      }
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [enabled, onReadToEnd, resetKey, sentinel])

  return useCallback((el: HTMLDivElement | null) => setSentinel(el), [])
}
