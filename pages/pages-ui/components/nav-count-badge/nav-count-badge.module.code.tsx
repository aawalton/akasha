"use client"

import { Badge } from "@akasha/design-badges/badge"
import { parsePageTypeData } from "@akasha/pages-core/schema/pages"
import { resolveDefinitionOptions } from "@akasha/pages-core/schema/resolve-select-options"
import type { ViewDataJSON } from "@akasha/pages-core/schema/view-data"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { useAllPages, useViewsForNavItem } from "@akasha/pages-ui/supabase/hooks"
import { usePageViewQuery } from "@akasha/pages-ui/supabase/hooks-view-query"
import { useOptionListLookup } from "@akasha/pages-ui/supabase/use-option-list-lookup"
import { usePageTypeDirectory } from "@akasha/pages-ui/supabase/use-page-type-directory"
import { viewDataOfPage } from "@akasha/pages-ui/supabase/view-data-of-page"
import { shouldShowCountBadge } from "@akasha/pages-ui-components/nav-count-badge-decider"
import { useMemo } from "react"

const PAGE_TYPE_SLUG = "page-type"

interface NavCountBadgeProps {
  navItemId: string
  navItemSlug?: string
}

export function NavCountBadge({ navItemId, navItemSlug }: NavCountBadgeProps) {
  const { views } = useViewsForNavItem({ navItemId, navItemSlug })
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

  const lookupOptionList = useOptionListLookup()
  const pageTypeId = viewConfig?.pageTypeId
  const rowPageType = useMemo(
    () => (pageTypeId != null ? pageTypes.find((pt) => pt._id === pageTypeId) : undefined),
    [pageTypes, pageTypeId]
  )
  const rowPageTypeSlug =
    typeof rowPageType?.properties?.slug === "string" ? rowPageType.properties.slug : undefined
  const rowProperties = useMemo<readonly PropertyDefinition[]>(() => {
    if (rowPageType == null) return []
    const { propertyDefinitions } = parsePageTypeData(rowPageType.properties)
    return propertyDefinitions.map((d) => resolveDefinitionOptions(d, lookupOptionList))
  }, [rowPageType, lookupOptionList])

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
