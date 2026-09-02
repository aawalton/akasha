"use client"

import { getPages } from "@akasha/pages-access/get"
import { NEVER_MATCH_VALUE } from "@akasha/pages-access/sentinels"
import type { PageWhere } from "@akasha/pages-core/page-types"
import { useQuery } from "@akasha/pages-ui/cache/use-query"
import { composeContentTierPage } from "@akasha/pages-ui/supabase/compose-content-tier-page"
import {
  type PageWithProperties,
  toPageWithProperties,
} from "@akasha/pages-ui/supabase/page-with-properties"
import { FILE_BACKING_POLL_MS } from "@akasha/pages-ui-store/collection/fetch-attach"
import { getContentPersistence } from "@akasha/pages-ui-store/singleton"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { useEffect, useMemo, useRef, useState } from "react"

export function usePage({
  pageTypeSlug,
  id,
  includeContentOnDemand = false,
  largeKeys,
}: {
  pageTypeSlug: PageTypeSlug
  id: string | undefined
  includeContentOnDemand?: boolean
  largeKeys?: readonly string[]
}): {
  page: PageWithProperties | null
  isLoading: boolean
} {
  const where = useMemo<PageWhere>(() => [{ key: "id", eq: id ?? NEVER_MATCH_VALUE }], [id])
  const result = useQuery({ pageTypeSlug, where, limit: 1 })
  const mirrorRow = result.rows[0] ?? null
  const onDemandResult = useOnDemandPageById({
    pageTypeSlug,
    id,
    enabled: includeContentOnDemand,
    includeContent: includeContentOnDemand,
    convergenceSignal: useConvergenceSignal(includeContentOnDemand),
    largeKeys,
  })
  const mirrorPage = mirrorRow !== null ? toPageWithProperties(mirrorRow) : null

  if (includeContentOnDemand) {
    const page = composeContentTierPage(onDemandResult.page, mirrorPage)
    const isLoading =
      id != null && (onDemandResult.isLoading || (page === null && result.isLoading))
    return { page, isLoading }
  }

  const isLoading = id != null && result.isLoading
  return { page: mirrorPage, isLoading }
}

function useConvergenceSignal(enabled: boolean): string | undefined {
  const [poll, setPoll] = useState(0)
  useEffect(() => {
    if (!enabled) return
    const timer = setInterval(() => setPoll((n) => n + 1), FILE_BACKING_POLL_MS)
    return () => clearInterval(timer)
  }, [enabled])
  return `poll:${poll}`
}

function useOnDemandPageById({
  pageTypeSlug,
  id,
  enabled,
  includeContent,
  convergenceSignal,
  largeKeys,
}: {
  pageTypeSlug: PageTypeSlug
  id: string | undefined
  enabled: boolean
  includeContent: boolean
  convergenceSignal: string | undefined
  largeKeys: readonly string[] | undefined
}): { page: PageWithProperties | null; isLoading: boolean } {
  const [page, setPage] = useState<PageWithProperties | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const reqRef = useRef(0)
  const loadedIdRef = useRef<string | undefined>(undefined)
  const named = useMemo(
    () => (largeKeys === undefined || largeKeys.length === 0 ? undefined : ["id", ...largeKeys]),
    [largeKeys]
  )
  useEffect(() => {
    const reqId = ++reqRef.current
    if (!enabled || id == null) {
      loadedIdRef.current = undefined
      setPage(null)
      setIsLoading(false)
      return
    }
    if (loadedIdRef.current !== id) setIsLoading(true)
    const port = getContentPersistence()
    void (async () => {
      const args = {
        pageTypeSlug,
        where: [{ key: "id", eq: id }] satisfies PageWhere,
        limit: 1,
        includeContent,
        ...(named === undefined ? {} : { select: named }),
      }
      if (port === null) {
        const result = await getPages(args)
        if (reqId !== reqRef.current) return
        const first = result.rows[0]
        setPage(first !== undefined ? toPageWithProperties(first) : null)
        loadedIdRef.current = id
        setIsLoading(false)
        return
      }
      try {
        const result = await getPages(args)
        if (reqId !== reqRef.current) return
        const first = result.rows[0]
        if (first !== undefined) port.savePages([first])
        setPage(first !== undefined ? toPageWithProperties(first) : null)
        loadedIdRef.current = id
        setIsLoading(false)
      } catch {
        const cached = await port.loadPages([id]).catch(() => [] as const)
        if (reqId !== reqRef.current) return
        const first = cached[0]
        setPage(first !== undefined ? toPageWithProperties(first) : null)
        loadedIdRef.current = id
        setIsLoading(false)
      }
    })()
  }, [pageTypeSlug, id, enabled, includeContent, convergenceSignal, named])
  return { page, isLoading }
}
