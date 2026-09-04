"use client"

import { useState } from "react"

interface UseSetToggleReturn {
  items: Set<string>
  toggle: (key: string) => void
  has: (key: string) => boolean
  setAll: (keys: Iterable<string>) => void
  clear: () => void
}

export function useSetToggle(initial?: Iterable<string>): UseSetToggleReturn {
  const [items, setItems] = useState<Set<string>>(() => (initial ? new Set(initial) : new Set()))

  function toggle(key: string) {
    setItems((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function setAll(keys: Iterable<string>) {
    setItems(new Set(keys))
  }

  function clear() {
    setItems(new Set())
  }

  function has(key: string) {
    return items.has(key)
  }

  return { items, toggle, has, setAll, clear }
}
