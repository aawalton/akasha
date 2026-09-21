"use client"

import { useCallback, useEffect, useRef } from "react"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

export function useDebouncedCallback<A extends unknown[]>(
  fn: (...args: A) => void,
  delay: number
): (...args: A) => undefined {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fnRef = useRef(fn)
  fnRef.current = fn

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return useCallback(
    (...args: A) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => fnRef.current(...args), delay)
    },
    [delay]
  )
}
