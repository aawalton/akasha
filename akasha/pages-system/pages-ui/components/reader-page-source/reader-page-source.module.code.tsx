"use client"

import { parsePageTypeData } from "@akasha/pages-core/schema/pages"
import { useAllPages } from "@akasha/pages-ui/supabase/hooks"
import { usePage } from "@akasha/pages-ui/supabase/use-page"
import { useSetPropertyOptimistic } from "@akasha/pages-ui/supabase/use-set-property-optimistic"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import { getLocalPositionReader } from "@akasha/pages-ui-components/local-position-port"
import { PageDetailHeaderMenu } from "@akasha/pages-ui-components/page-detail-header-menu"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { createContext, type ReactNode, useContext, useEffect, useState } from "react"

function useDefaultReaderLocalPosition(pageId: string): {
  readonly value: number | undefined
  readonly loaded: boolean
} {
  const [state, setState] = useState<{ value: number | undefined; loaded: boolean }>(() =>
    getLocalPositionReader() == null
      ? { value: undefined, loaded: true }
      : { value: undefined, loaded: false }
  )
  useEffect(() => {
    const reader = getLocalPositionReader()
    if (reader == null) {
      setState({ value: undefined, loaded: true })
      return
    }
    let cancelled = false
    setState({ value: undefined, loaded: false })
    void reader(pageId).then((value) => {
      if (!cancelled) setState({ value, loaded: true })
    })
    return () => {
      cancelled = true
    }
  }, [pageId])
  return state
}

const PAGE_TYPE_SLUG = "page-type"

export interface ReaderHeaderMenuProps {
  readonly pageTypeSlug: PageTypeSlug
  readonly pageId: string
  readonly isFavorite: boolean
}

export interface ReaderPageSource {
  readonly useReaderPageType: (targetSlug: PageTypeSlug) => {
    readonly pageTypeData: ReturnType<typeof parsePageTypeData>
  }
  readonly useReaderPage: (args: {
    pageTypeSlug: PageTypeSlug
    id: string | undefined
    includeContentOnDemand: boolean
  }) => ReturnType<typeof usePage>
  readonly useReaderUserId: () => ReturnType<typeof useUserId>
  readonly useReaderSetProperty: () => ReturnType<typeof useSetPropertyOptimistic>
  readonly useReaderLocalPosition: (pageId: string) => {
    readonly value: number | undefined
    readonly loaded: boolean
  }
  readonly ReaderHeaderMenu: (props: ReaderHeaderMenuProps) => ReactNode
}

export const ONLINE_READER_PAGE_SOURCE: ReaderPageSource = {
  useReaderPageType: (targetSlug) => {
    const { pages } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })
    const pageType = pages.find((pt) => pt.properties?.slug === targetSlug)
    return { pageTypeData: parsePageTypeData(pageType?.properties) }
  },
  useReaderPage: (args) => usePage(args),
  useReaderUserId: () => useUserId(),
  useReaderSetProperty: () => useSetPropertyOptimistic(),
  useReaderLocalPosition: useDefaultReaderLocalPosition,
  ReaderHeaderMenu: PageDetailHeaderMenu,
}

const ReaderPageSourceContext = createContext<ReaderPageSource>(ONLINE_READER_PAGE_SOURCE)

export function useReaderPageSource(): ReaderPageSource {
  return useContext(ReaderPageSourceContext)
}
