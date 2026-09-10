"use client"

import { useCallback, useRef } from "react"

export function useStableScroll() {
  const scrollYRef = useRef<number | null>(null)

  const withStableScroll = useCallback(<T extends unknown[]>(fn: (...args: T) => void) => {
    return (...args: T) => {
      scrollYRef.current = window.scrollY
      fn(...args)
      requestAnimationFrame(() => {
        if (scrollYRef.current !== null) {
          window.scrollTo(0, scrollYRef.current)
          scrollYRef.current = null
        }
      })
    }
  }, [])

  return { withStableScroll }
}
