"use client"

import { useEffect, useRef } from "react"
import { z } from "zod"

const SCROLL_DATA_SCHEMA = z
  .object({
    scrollY: z.number(),
    filterHash: z.string(),
    visibleCount: z.number().optional(),
  })
  .strict()

interface UseScrollRestorationOptions {
  key: string
  filterHash?: string
  visibleCount?: number
}

interface UseScrollRestorationReturn {
  restoredVisibleCount: number | null
}

type ScrollData = z.infer<typeof SCROLL_DATA_SCHEMA>

const STORAGE_PREFIX = "temper:scroll:"
const DEBOUNCE_MS = 150

export function useScrollRestoration({
  key,
  filterHash = "",
  visibleCount,
}: UseScrollRestorationOptions): UseScrollRestorationReturn {
  const storageKey = `${STORAGE_PREFIX}${key}`
  const filterHashRef = useRef(filterHash)
  const isPopstateRef = useRef(false)
  const visibleCountRef = useRef(visibleCount)
  visibleCountRef.current = visibleCount

  const restoredRef = useRef<number | null>(null)
  const hasReadRef = useRef(false)
  if (!hasReadRef.current) {
    hasReadRef.current = true
    try {
      const raw = sessionStorage.getItem(storageKey)
      if (raw != null) {
        const data = SCROLL_DATA_SCHEMA.parse(JSON.parse(raw))
        if (data.filterHash === filterHash && data.visibleCount !== undefined) {
          restoredRef.current = data.visibleCount
        }
      }
    } catch {}
  }

  useEffect(() => {
    if (filterHashRef.current !== filterHash) {
      filterHashRef.current = filterHash
      try {
        sessionStorage.removeItem(storageKey)
      } catch {}
    }
  }, [filterHash, storageKey])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        try {
          const data: ScrollData = {
            scrollY: window.scrollY,
            filterHash,
            visibleCount: visibleCountRef.current,
          }
          sessionStorage.setItem(storageKey, JSON.stringify(data))
        } catch {}
      }, DEBOUNCE_MS)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [storageKey, filterHash])

  useEffect(() => {
    const handlePopstate = () => {
      isPopstateRef.current = true
    }

    window.addEventListener("popstate", handlePopstate)
    return () => window.removeEventListener("popstate", handlePopstate)
  }, [])

  useEffect(() => {
    if (!isPopstateRef.current) return
    isPopstateRef.current = false

    try {
      const raw = sessionStorage.getItem(storageKey)
      if (raw == null) return

      const data = SCROLL_DATA_SCHEMA.parse(JSON.parse(raw))
      if (data.filterHash !== filterHash) {
        sessionStorage.removeItem(storageKey)
        return
      }

      requestAnimationFrame(() => {
        window.scrollTo(0, data.scrollY)
      })
    } catch {}
  }, [storageKey, filterHash])

  return { restoredVisibleCount: restoredRef.current }
}
