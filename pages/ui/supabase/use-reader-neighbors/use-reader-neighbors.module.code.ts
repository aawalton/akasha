"use client"

import { getPages } from "akasha/pages/access/get/get.module.code.ts"
import { getOrderedNeighbors } from "akasha/pages/access/ordered/ordered.module.code.ts"
import type { ReaderNeighborLink } from "akasha/pages/ui/components/reader-chrome/reader-chrome.module.code.tsx"
import { pageLinkOf } from "akasha/pages/url/page-href/page-href.module.code.ts"
import type { PageTypeSlug } from "akasha/pages/url/page-type-slug/page-type-slug.module.code.ts"
import { useEffect, useRef, useState } from "react"

interface ReaderNeighbors {
  prev: ReaderNeighborLink | null
  next: ReaderNeighborLink | null
}

const EMPTY: ReaderNeighbors = { prev: null, next: null }

export function useReaderNeighbors(
  id: string | undefined,
  pageTypeSlug: PageTypeSlug
): ReaderNeighbors {
  const [neighbors, setNeighbors] = useState<ReaderNeighbors>(EMPTY)
  const reqRef = useRef(0)
  useEffect(() => {
    const reqId = ++reqRef.current
    if (id == null) {
      setNeighbors(EMPTY)
      return
    }
    void (async () => {
      try {
        const { rows } = await getPages({
          pageTypeSlug,
          where: [{ key: "id", eq: id }],
          limit: 1,
        })
        const page = rows[0]
        if (page == null) {
          if (reqId === reqRef.current) setNeighbors(EMPTY)
          return
        }
        const { prev, next } = await getOrderedNeighbors({
          page,
          select: ["id", "title", "slug"],
        })
        if (reqId !== reqRef.current) return
        setNeighbors({
          prev: pageLinkOf(prev, pageTypeSlug),
          next: pageLinkOf(next, pageTypeSlug),
        })
      } catch {
        if (reqId === reqRef.current) setNeighbors(EMPTY)
      }
    })()
  }, [id, pageTypeSlug])
  return neighbors
}
