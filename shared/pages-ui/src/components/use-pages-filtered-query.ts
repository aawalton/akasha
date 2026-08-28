"use client"

import { NEVER_MATCH_VALUE } from "@shared/pages-access/sentinels"
import { parsePageTypeData } from "@shared/pages-core/schema/pages"
import { resolveDefinitionOptions } from "@shared/pages-core/schema/resolve-select-options"
import { type ViewFilter } from "@shared/pages-core/schema/view-data"
import { type PropertyDefinition } from "@shared/pages-core/types"
import type { PageTypeSlug } from "@shared/pages-url"
import { useMemo } from "react"
import { useGroupByPaginatedQuery } from "../supabase/group-by-hooks.ts"
import { useAllPages, useRelatedPages } from "../supabase/hooks.ts"
import { usePageViewQuery } from "../supabase/hooks-view-query.ts"
import { type PageWithProperties } from "../supabase/types.ts"
import { useOptionListLookup } from "../supabase/use-option-list-lookup.ts"
import { type PageRow } from "../view-engine/page-row.ts"
import { useViewRowAggregates } from "../view-engine/use-view-row-aggregates.ts"
import { buildBaseConditions } from "./base-conditions.ts"
import { buildServerGroupedSections } from "./build-server-grouped-sections.ts"
import { buildFlatQueryArgs } from "./flat-query-args.ts"
import { toPageDataRecord } from "./page-data-json.ts"
import type { ServerGroupedSection } from "./page-system-view-types.ts"
import { buildBaseFilters, buildSyntheticConfig } from "./synthetic-config.ts"
import { useEffectiveListing } from "./use-effective-listing.ts"
import { buildPageTypeSlugMaps } from "./view-tab-content-href.ts"

const PAGE_TYPE_SLUG = "page-type"

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

  const propertiesByPageType = useMemo<ReadonlyMap<string, readonly PropertyDefinition[]>>(() => {
    const map = new Map<string, readonly PropertyDefinition[]>()
    for (const pt of pageTypes) {
      const { propertyDefinitions } = parsePageTypeData(pt.properties)
      if (propertyDefinitions.length > 0) {
        map.set(
          pt._id,
          propertyDefinitions.map((d) => resolveDefinitionOptions(d, lookupOptionList))
        )
      }
    }
    return map
  }, [pageTypes, lookupOptionList])

  const { slugById: pageTypeSlugById, pluralSlugById: pageTypePluralSlugById } = useMemo(
    () => buildPageTypeSlugMaps(pageTypes),
    [pageTypes]
  )

  const pageTypeName = String(targetPageType?.properties?.title ?? "Items")

  const baseFilters = useMemo<readonly ViewFilter[]>(
    () => buildBaseFilters(searchParams),
    [searchParams]
  )

  const syntheticConfig = useMemo(
    () => buildSyntheticConfig(searchParams, baseFilters),
    [searchParams, baseFilters]
  )

  const baseConditions = useMemo(
    () => buildBaseConditions({ baseFilters, properties, targetPageTypeId, propertiesByPageType }),
    [baseFilters, properties, targetPageTypeId, propertiesByPageType]
  )

  const { effectiveConfig, spanDescendants, descendantPages, descendantIsLoading } =
    useEffectiveListing({
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

  const rowAggregates = useViewRowAggregates({
    pages: allPages,
    definitions: properties,
    relatedPages,
  })

  const pageRows = useMemo<PageRow[]>(
    () =>
      pages.map((p) => {
        const fill = rowAggregates.get(p._id)
        const props = fill === undefined ? p.properties : { ...p.properties, ...fill }
        return { ...toPageDataRecord(props), _id: p._id }
      }),
    [pages, rowAggregates]
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
    propertiesByPageType,
    pageTypeSlugById,
    pageTypePluralSlugById,
    pageTypeName,
    baseFilters,
    effectiveConfig,
    loadMore,
    canLoadMore,
    isLoading,
    totalCount,
    allPages,
    relatedPages,
    rowAggregates,
    pageRows,
    serverGrouped,
  }
}
