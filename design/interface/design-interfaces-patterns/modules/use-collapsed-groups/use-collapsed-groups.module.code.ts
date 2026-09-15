"use client"

import { useCallback, useMemo, useState } from "react"
import { z } from "zod"

const STORAGE_SCHEMA = z.record(z.string(), z.boolean())

interface UseCollapsedGroupsOptions {
  storageKey: string
  defaultCollapsed?: boolean
}

interface UseCollapsedGroupsResult {
  isOpen: (groupKey: string) => boolean
  toggle: (groupKey: string) => void
  setOpen: (groupKey: string, open: boolean) => void
}

function readStorage(storageKey: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(storageKey)
    if (raw != null) {
      const parsed = STORAGE_SCHEMA.safeParse(JSON.parse(raw))
      if (parsed.success) return parsed.data
    }
  } catch {}
  return {}
}

function writeStorage(storageKey: string, record: Record<string, boolean>) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(record))
  } catch {}
}

export function useCollapsedGroups({
  storageKey,
  defaultCollapsed = false,
}: UseCollapsedGroupsOptions): UseCollapsedGroupsResult {
  const [record, setRecord] = useState<Record<string, boolean>>(() => readStorage(storageKey))

  const defaultOpen = !defaultCollapsed

  const isOpen = useCallback(
    (groupKey: string) => record[groupKey] ?? defaultOpen,
    [record, defaultOpen]
  )

  const setOpen = useCallback(
    (groupKey: string, open: boolean) => {
      setRecord((prev) => {
        const next = { ...prev, [groupKey]: open }
        writeStorage(storageKey, next)
        return next
      })
    },
    [storageKey]
  )

  const toggle = useCallback(
    (groupKey: string) => {
      setOpen(groupKey, !isOpen(groupKey))
    },
    [setOpen, isOpen]
  )

  return useMemo(() => ({ isOpen, toggle, setOpen }), [isOpen, toggle, setOpen])
}
