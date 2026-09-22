"use client"

import { NEVER_MATCH_VALUE } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"
import { parsePageTypeData } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import { resolveDefinitionOptions } from "akasha/page/core/schema/modules/resolve-select-options/resolve-select-options.module.code.ts"
import type { ViewFilter } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { buildBaseConditions } from "akasha/page/ui/component/modules/base-conditions/base-conditions.module.code.ts"
import { buildServerGroupedSections } from "akasha/page/ui/component/modules/build-server-grouped-sections/build-server-grouped-sections.module.code.ts"
import { buildFlatQueryArgs } from "akasha/page/ui/component/modules/flat-query-args/flat-query-args.module.code.ts"
import { toPageDataRecord } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import type { ServerGroupedSection } from "akasha/page/ui/component/modules/page-system-tab-content-props/page-system-tab-content-props.module.code.ts"
import {
  buildBaseFilters,
  buildSyntheticConfig,
} from "akasha/page/ui/component/modules/synthetic-config/synthetic-config.module.code.ts"
import { useEffectiveListing } from "akasha/page/ui/component/modules/use-effective-listing/use-effective-listing.module.code.ts"
import { buildPageTypeSlugMaps } from "akasha/page/ui/component/modules/view-tab-content-href/view-tab-content-href.module.code.ts"

import type { PageRow } from "akasha/page/ui/component/view-engine/modules/view-row/view-row.module.code.ts"
import { useGroupByPaginatedQuery } from "akasha/page/ui/supabase/modules/group-by-hooks/group-by-hooks.module.code.ts"
import {
  useAllPages,
  useRelatedPages,
} from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import { usePageViewQuery } from "akasha/page/ui/supabase/modules/hooks-view-query/hooks-view-query.module.code.ts"
import type { PageWithProperties } from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import { useOptionListLookup } from "akasha/page/ui/supabase/modules/use-option-list-lookup/use-option-list-lookup.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useMemo } from "react"

const PAGE_TYPE_SLUG = "page-type"

const ANY_PAGES = "Items"

function namedAsType(properties: Readonly<Record<string, unknown>> | undefined): string {
  const title = properties?.["title"]
  if (typeof title === "string" && title !== "") return title
  const plural = properties?.["pluralSlug"]
  if (typeof plural === "string" && plural !== "") return titledAs(plural)
  const slug = properties?.["slug"]
  if (typeof slug === "string" && slug !== "") return titledAs(slug)
  return ANY_PAGES
}

export function usePagesFilteredQuery(args: {
  pageTypeSlug: PageTypeSlug
  searchParams: Record<string, string>
}) {
  const { pageTypeSlug, searchParams } = args

  const { pages: pageTypes, isLoading: pageTypesLoading } = useAllPages({
    pageTypeSlug: PAGE_TYPE_SLUG,
  })
  const lookupOptionList = useOptionListLookup()

  const targetPageType = useMemo(
    () => pageTypes.find((pt) => pt.properties?.slug === pageTypeSlug),
    [pageTypes, pageTypeSlug]
  )
  const targetPageTypeId = targetPageType?._id ?? ""

  const { propertyDefinitions: rawProperties, listingConfig } = useMemo(
    () => parsePageTypeData(targetPageType?.properties),
    [targetPageType]
  )
  const properties = useMemo(
    () => rawProperties.map((d) => resolveDefinitionOptions(d, lookupOptionList)),
    [rawProperties, lookupOptionList]
  )

  const { slugById: pageTypeSlugById } = useMemo(
    () => buildPageTypeSlugMaps(pageTypes),
    [pageTypes]
  )

  const pageTypeName = namedAsType(targetPageType?.properties)

  const baseFilters = useMemo<readonly ViewFilter[]>(
    () => buildBaseFilters(searchParams),
    [searchParams]
  )

  const syntheticConfig = useMemo(
    () => buildSyntheticConfig(searchParams, baseFilters),
    [searchParams, baseFilters]
  )

  const baseConditions = useMemo(
    () => buildBaseConditions({ baseFilters, properties }),
    [baseFilters, properties]
  )

  const {
    effectiveConfig,
    spanDescendants,
    descendantPages,
    descendantIsLoading,
    descendantUnasked,
  } = useEffectiveListing({
    listingConfig,
    syntheticConfig,
    pageTypes,
    targetPageTypeId,
    where: baseConditions,
  })

  const groupByRaw = spanDescendants ? undefined : effectiveConfig?.group_by
  const groupByPropertyId = groupByRaw != null && groupByRaw.length > 0 ? groupByRaw : undefined

  const primarySort = effectiveConfig?.sorts?.[0]
  const sortPropertyId = primarySort ? String(primarySort.field ?? "") : undefined
  const rawDirection = primarySort ? String(primarySort.direction ?? "desc") : undefined
  const sortDirection: "asc" | "desc" | undefined =
    rawDirection === "asc" || rawDirection === "desc" ? rawDirection : undefined
  const viewFilters = useMemo(() => {
    if (effectiveConfig?.filters == null || effectiveConfig.filters.length === 0) return undefined
    return effectiveConfig.filters.map((f) => ({
      propertyId: f.propertyId,
      operator: f.operator,
      value: f.value,
    }))
  }, [effectiveConfig?.filters])

  const flatResult = usePageViewQuery(
    buildFlatQueryArgs({
      groupByPropertyId,
      spanDescendants,
      targetPageTypeId,
      pageTypeSlug,
      effectiveConfig,
      properties,
    }) ?? { pageTypeId: NEVER_MATCH_VALUE, viewConfig: undefined }
  )

  const groupedResult = useGroupByPaginatedQuery({
    pageTypeSlug: groupByPropertyId != null ? pageTypeSlug : "",
    groupPropertyId: groupByPropertyId ?? "",
    sortPropertyId:
      sortPropertyId != null && sortPropertyId.length > 0 ? sortPropertyId : undefined,
    sortDirection,
    filters: viewFilters,
    properties,
    groupGranularity: syntheticConfig?.group_granularity,
  })

  const pages = spanDescendants
    ? descendantPages
    : groupByPropertyId != null
      ? []
      : flatResult.pages
  const loadMore = spanDescendants || groupByPropertyId != null ? undefined : flatResult.loadMore
  const canLoadMore = spanDescendants || groupByPropertyId != null ? false : flatResult.hasMore
  const isLoading = spanDescendants
    ? descendantIsLoading
    : groupByPropertyId != null
      ? groupedResult.isLoading
      : flatResult.isLoading
  const totalCount: number | null = spanDescendants
    ? descendantPages.length
    : groupByPropertyId != null
      ? null
      : flatResult.totalCount

  const allPages = useMemo(() => {
    if (groupByPropertyId == null) return pages
    const out: PageWithProperties[] = []
    for (const [, group] of groupedResult.groups) {
      out.push(...group.pages)
    }
    return out
  }, [groupByPropertyId, pages, groupedResult.groups])

  const pagesForRelation = useMemo(
    () => allPages.map((p) => ({ properties: p.properties ?? {} })),
    [allPages]
  )
  const relatedPages = useRelatedPages({
    definitions: properties,
    pages: pagesForRelation,
    pageTypeSlugById,
  })

  const pageRows = useMemo<PageRow[]>(
    () => pages.map((p) => ({ ...toPageDataRecord(p.properties), _id: p._id })),
    [pages]
  )

  const serverGrouped = useMemo<readonly ServerGroupedSection[] | undefined>(
    () =>
      buildServerGroupedSections({
        groupByPropertyId,
        properties,
        pageSets: [pageTypes, allPages, relatedPages],
        groups: groupedResult.groups,
        loadMore: groupedResult.loadMore,
        groupGranularity: syntheticConfig?.group_granularity,
      }),
    [
      groupByPropertyId,
      properties,
      pageTypes,
      allPages,
      relatedPages,
      groupedResult.groups,
      groupedResult.loadMore,
      syntheticConfig?.group_granularity,
    ]
  )

  return {
    pageTypes,
    pageTypesLoading,
    targetPageType,
    targetPageTypeId,
    properties,
    pageTypeSlugById,
    pageTypeName,
    baseFilters,
    effectiveConfig,
    loadMore,
    canLoadMore,
    isLoading,
    totalCount,
    allPages,
    relatedPages,
    pageRows,
    serverGrouped,
    descendantUnasked,
  }
}
