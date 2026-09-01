"use client"

import { useCallback, useRef, useState } from "react"

export interface BlockCollapseApi {
  readonly collapsed: ReadonlySet<string>
  readonly isCollapsed: (id: string) => boolean
  readonly toggleCollapse: (id: string) => void
  readonly expand: (id: string) => void
  readonly defaultCollapseToggles: (toggleIds: readonly string[]) => void
}

export function useBlockCollapse(initialToggleIds?: readonly string[]): BlockCollapseApi {
  const seed = initialToggleIds ?? []
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(() => new Set(seed))
  const ref = useRef<ReadonlySet<string>>(collapsed)
  const seenRef = useRef<Set<string>>(new Set(seed))
  const commit = useCallback((next: ReadonlySet<string>) => {
    ref.current = next
    setCollapsed(next)
  }, [])
  const isCollapsed = useCallback((id: string) => ref.current.has(id), [])
  const toggleCollapse = useCallback(
    (id: string) => {
      const next = new Set(ref.current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      commit(next)
    },
    [commit]
  )
  const expand = useCallback(
    (id: string) => {
      if (!ref.current.has(id)) return
      const next = new Set(ref.current)
      next.delete(id)
      commit(next)
    },
    [commit]
  )
  const defaultCollapseToggles = useCallback(
    (toggleIds: readonly string[]) => {
      const fresh = toggleIds.filter((id) => !seenRef.current.has(id))
      if (fresh.length === 0) return
      const next = new Set(ref.current)
      for (const id of fresh) {
        seenRef.current.add(id)
        next.add(id)
      }
      commit(next)
    },
    [commit]
  )
  return { collapsed, isCollapsed, toggleCollapse, expand, defaultCollapseToggles }
}
