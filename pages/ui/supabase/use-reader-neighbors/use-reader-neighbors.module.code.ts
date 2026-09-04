"use client"

import { getPages } from "@akasha/pages-access/get"
import { getOrderedNeighbors } from "@akasha/pages-access/ordered"
import type { Page } from "@akasha/pages-core/page-types"
import type { ReaderNeighborLink } from "@akasha/pages-ui-components/reader-chrome"
import { buildPageHref } from "@akasha/pages-url/page-href"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
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
        setNeighbors({ prev: toLink(prev, pageTypeSlug), next: toLink(next, pageTypeSlug) })
      } catch {
        if (reqId === reqRef.current) setNeighbors(EMPTY)
      }
    })()
  }, [id, pageTypeSlug])
  return neighbors
}

function toLink(neighbor: Page | null, pageTypeSlug: PageTypeSlug): ReaderNeighborLink | null {
  if (neighbor == null || typeof neighbor.id !== "string") return null
  const title = typeof neighbor.title === "string" ? neighbor.title : null
  return {
    href: buildPageHref({
      pageTypeSlug,
      slug: typeof neighbor.slug === "string" ? neighbor.slug : null,
      fallbackSlugSource: title,
      id: neighbor.id,
    }),
    title,
  }
}
