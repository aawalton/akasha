"use client"

import { parsePageTypeData } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import { PageDetailHeaderMenu } from "akasha/page/ui/component/modules/page-detail-header-menu/page-detail-header-menu.module.code.tsx"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { useAllPages } from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import { useSetPropertyOptimistic } from "akasha/page/ui/supabase/modules/use-set-property-optimistic/use-set-property-optimistic.module.code.tsx"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { createContext, type ReactNode, useContext } from "react"

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
  }) => ReturnType<typeof usePage>
  readonly useReaderUserId: () => ReturnType<typeof useUserId>
  readonly useReaderSetProperty: () => ReturnType<typeof useSetPropertyOptimistic>
  readonly ReaderHeaderMenu: (props: ReaderHeaderMenuProps) => ReactNode
}

const ONLINE_READER_PAGE_SOURCE: ReaderPageSource = {
  useReaderPageType: (targetSlug) => {
    const { pages } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })
    const pageType = pages.find((pt) => pt.properties?.slug === targetSlug)
    return { pageTypeData: parsePageTypeData(pageType?.properties) }
  },
  useReaderPage: (args) => usePage(args),
  useReaderUserId: () => useUserId(),
  useReaderSetProperty: () => useSetPropertyOptimistic(),
  ReaderHeaderMenu: PageDetailHeaderMenu,
}

const ReaderPageSourceContext = createContext<ReaderPageSource>(ONLINE_READER_PAGE_SOURCE)

export function useReaderPageSource(): ReaderPageSource {
  return useContext(ReaderPageSourceContext)
}
