"use client"

import { useEffect, useState } from "react"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
