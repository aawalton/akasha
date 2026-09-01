"use client"

import { type CSSProperties, type RefObject, useEffect, useRef, useState } from "react"

const OVERFLOW_FADE_STYLE: CSSProperties = {
  maskImage: "linear-gradient(to right, black calc(100% - 2rem), transparent)",
}

export function useOverflowFade<T extends HTMLElement>(
  content: unknown
): { ref: RefObject<T | null>; style: CSSProperties | undefined } {
  const ref = useRef<T>(null)
  const [overflowing, setOverflowing] = useState(false)

  useEffect(() => {
    void content
    const el = ref.current
    if (el == null) return
    const measure = () => {
      setOverflowing(el.scrollWidth - el.clientWidth > 1)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [content])

  return { ref, style: overflowing ? OVERFLOW_FADE_STYLE : undefined }
}
