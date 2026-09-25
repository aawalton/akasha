"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { parsePageTypeData } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import type { ViewDataJSON } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { shouldShowCountBadge } from "akasha/page/ui/component/modules/nav-count-badge-decider/nav-count-badge-decider.module.code.ts"
import {
  useAllPages,
  useViewsForNavItem,
} from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import { usePageViewQuery } from "akasha/page/ui/supabase/modules/hooks-view-query/hooks-view-query.module.code.ts"
import { usePageTypeDirectory } from "akasha/page/ui/supabase/modules/use-page-type-directory/use-page-type-directory.module.code.ts"
import { viewDataOfPage } from "akasha/page/ui/supabase/modules/view-data-of-page/view-data-of-page.module.code.ts"
import { useMemo } from "react"

const PAGE_TYPE_SLUG = "page-type"

interface NavCountBadgeProps {
  navItemSlug?: string
}

export function NavCountBadge({ navItemSlug }: NavCountBadgeProps) {
  const { views } = useViewsForNavItem({ navItemSlug })
  const firstView = views[0]

  const { pages: pageTypes } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })
  const fromFiles = usePageTypeDirectory()
  const pageTypeIdBySlug = useMemo(() => {
    const map = new Map<string, string>()
    for (const pt of pageTypes) {
      const slug = pt.properties?.slug
      if (typeof slug === "string" && slug !== "") map.set(slug, pt._id)
    }
    return (slug: string): string | undefined => map.get(slug) ?? fromFiles(slug)
  }, [pageTypes, fromFiles])

  const viewConfig: ViewDataJSON | undefined = useMemo(
    () => viewDataOfPage(firstView?.properties, pageTypeIdBySlug),
    [firstView, pageTypeIdBySlug]
  )

  const pageTypeId = viewConfig?.pageTypeId
  const rowPageType = useMemo(
    () => (pageTypeId != null ? pageTypes.find((pt) => pt._id === pageTypeId) : undefined),
    [pageTypes, pageTypeId]
  )
  const rowPageTypeSlug =
    typeof rowPageType?.properties?.slug === "string" ? rowPageType.properties.slug : undefined
  const rowProperties = useMemo<readonly PropertyDefinition[]>(() => {
    if (rowPageType == null) return []
    return parsePageTypeData(rowPageType.properties).propertyDefinitions
  }, [rowPageType])

  const { totalCount } = usePageViewQuery({
    pageTypeId: pageTypeId ?? "",
    pageTypeSlug: rowPageTypeSlug,
    viewConfig,
    properties: rowProperties,
  })

  if (!shouldShowCountBadge(totalCount)) return null
  return (
    <Badge variant="accent" aria-label={`${totalCount} unread`}>
      {totalCount}
    </Badge>
  )
}
