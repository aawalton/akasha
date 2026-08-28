"use client"

import { NEVER_MATCH_SLUG, NEVER_MATCH_VALUE } from "@shared/pages-access/sentinels"
import { parsePageTypeData } from "@shared/pages-core/schema/pages"
import { resolveDefinitionOptions } from "@shared/pages-core/schema/resolve-select-options"
import { type ViewDataJSON } from "@shared/pages-core/schema/view-data"
import { type LockedFacet, mergeLockedFacets } from "@shared/pages-core/schema/view-data-locked"
import { type PropertyDefinition } from "@shared/pages-core/types"
import { deriveViewTargetSlugs } from "@shared/pages-ui-store/query/view-target-slugs"
import { buildPageHref, PageTypeSlug } from "@shared/pages-url"
import { useCallback, useMemo } from "react"
import { useGroupByPaginatedQuery } from "../supabase/group-by-hooks.ts"
import { useRelatedPages } from "../supabase/hooks.ts"
import { usePageViewQuery } from "../supabase/hooks-view-query.ts"
import { type PageWithProperties } from "../supabase/types.ts"
import { useOptionListLookup } from "../supabase/use-option-list-lookup.ts"
import { viewDataOfPage } from "../supabase/view-data-of-page.ts"
import { type PageRow } from "../view-engine/page-row.ts"
import { useViewRowAggregates } from "../view-engine/use-view-row-aggregates.ts"
import { useViewRowRollups } from "../view-engine/use-view-row-rollups.ts"
import { buildServerGroupedSections } from "./build-server-grouped-sections.ts"
import { toPageDataRecord } from "./page-data-json.ts"
import type { PageTypeOption } from "./page-system-view-settings-types.ts"
import type { ServerGroupedSection } from "./page-system-view-types.ts"
import { buildPageTypeSlugMaps, resolveRowPageTypeSlug } from "./view-tab-content-href.ts"
import { selectViewQueryResult } from "./view-tab-content-results.ts"

export interface ViewTabContentData {
  viewConfig: ViewDataJSON | undefined
  effectiveConfig: ViewDataJSON | undefined
  effectivePageTypeId: string | undefined
  effectivePageType: PageWithProperties | undefined
  rowPageTypeSlug: PageTypeSlug | undefined
  properties: readonly PropertyDefinition[]
  loadMore: (() => void) | undefined
  canLoadMore: boolean
  isLoading: boolean
  error: Error | null
  totalCount: number | null
  propertiesByPageType: ReadonlyMap<string, readonly PropertyDefinition[]>
  pageTypePluralSlugById: ReadonlyMap<string, string>
  allPages: readonly PageWithProperties[]
  relatedPages: readonly PageWithProperties[]
  rowAggregates: ReadonlyMap<string, Record<string, number | null>>
  pageHrefById: (id: string, opts?: { targetPageTypeId?: string }) => string
  resolveRowSlug: (id: string) => PageTypeSlug | undefined
  pageRows: readonly PageRow[]
  serverGrouped: readonly ServerGroupedSection[] | undefined
}

export function useViewTabContentData({
  parentPageTypeId,
  parentLocked,
  viewId,
  viewPages,
  pageTypes,
  pageTypeOptions,
}: {
  parentPageTypeId: string
  parentLocked?: LockedFacet
  viewId: string
  viewPages: readonly PageWithProperties[]
  pageTypes: readonly PageWithProperties[]
  pageTypeOptions?: readonly PageTypeOption[]
}): ViewTabContentData {
  const lookupOptionList = useOptionListLookup()
  const view = useMemo(() => viewPages.find((v) => v._id === viewId), [viewId, viewPages])
  const pageTypeIdBySlug = useMemo(() => {
    const map = new Map<string, string>()
    for (const pt of pageTypes) {
      const slug = pt.properties?.slug
      if (typeof slug === "string" && slug !== "") map.set(slug, pt._id)
    }
    return (slug: string): string | undefined => map.get(slug)
  }, [pageTypes])
  const viewConfig: ViewDataJSON | undefined = useMemo(
    () => viewDataOfPage(view?.properties, pageTypeIdBySlug),
    [view, pageTypeIdBySlug]
  )
  const effectiveConfig: ViewDataJSON | undefined = useMemo(() => {
    const effectiveLocked = mergeLockedFacets(parentLocked, viewConfig?.locked)
    if (viewConfig !== undefined) return { ...viewConfig, locked: effectiveLocked }
    return effectiveLocked === undefined ? undefined : { version: 1, locked: effectiveLocked }
  }, [viewConfig, parentLocked])
  const viewUpdatedAt =
    typeof view?.properties.updatedAt === "string" ? view.properties.updatedAt : undefined

  const effectivePageTypeId = pageTypeOptions != null ? viewConfig?.pageTypeId : parentPageTypeId

  const effectivePageType = useMemo(
    () =>
      pageTypes.find((pt) =>
        effectivePageTypeId != null
          ? pt._id === effectivePageTypeId
          : viewConfig?.pageTypeSlug != null && pt.properties?.slug === viewConfig.pageTypeSlug
      ),
    [pageTypes, effectivePageTypeId, viewConfig?.pageTypeSlug]
  )
  const rowSlugRaw = effectivePageType?.properties?.slug ?? viewConfig?.pageTypeSlug
  const rowPageTypeSlug = typeof rowSlugRaw === "string" ? PageTypeSlug(rowSlugRaw) : undefined

  const viewTargetSlugs = useMemo((): {
    gating: readonly string[]
    display: readonly string[]
  } => {
    if (effectivePageTypeId == null || effectiveConfig == null) {
      return { gating: [], display: [] }
    }
    const defsByTypeId = new Map<string, readonly PropertyDefinition[]>()
    const slugByTypeId = new Map<string, string | undefined>()
    for (const pt of pageTypes) {
      const { propertyDefinitions } = parsePageTypeData(pt.properties)
      defsByTypeId.set(
        pt._id,
        propertyDefinitions.map((d) => resolveDefinitionOptions(d, lookupOptionList))
      )
      const slug = pt.properties?.slug
      slugByTypeId.set(pt._id, typeof slug === "string" ? slug : undefined)
    }
    return deriveViewTargetSlugs(effectiveConfig, effectivePageTypeId, defsByTypeId, slugByTypeId)
  }, [pageTypes, effectiveConfig, effectivePageTypeId, lookupOptionList])

  const groupByRaw = viewConfig?.group_by
  const groupByPropertyId = groupByRaw != null && groupByRaw.length > 0 ? groupByRaw : undefined

  const primarySort = viewConfig?.sorts?.[0]
  const sortPropertyId = primarySort ? String(primarySort.field ?? "") : undefined
  const sortDirection: "asc" | "desc" | undefined = primarySort
    ? String(primarySort.direction ?? "desc") === "asc"
      ? "asc"
      : "desc"
    : undefined
  const viewFilters = useMemo(() => {
    if (viewConfig?.filters == null || viewConfig.filters.length === 0) return undefined
    return viewConfig.filters.map((f) => ({
      propertyId: f.propertyId,
      operator: f.operator,
      value: f.value,
    }))
  }, [viewConfig?.filters])

  const rowProperties = useMemo<readonly PropertyDefinition[]>(() => {
    if (effectivePageType == null) return []
    const { propertyDefinitions } = parsePageTypeData(effectivePageType.properties)
    return propertyDefinitions.map((d) => resolveDefinitionOptions(d, lookupOptionList))
  }, [effectivePageType, lookupOptionList])

  const flatQueryArgs = useMemo(() => {
    if (groupByPropertyId != null) return undefined
    if (viewConfig?.crossTypeSource != null) {
      return {
        pageTypeId: effectivePageTypeId ?? NEVER_MATCH_VALUE,
        viewConfig,
        properties: rowProperties,
        viewId,
        viewUpdatedAt,
        gatingTargetSlugs: viewTargetSlugs.gating,
        displayTargetSlugs: viewTargetSlugs.display,
      }
    }
    if (rowPageTypeSlug != null) {
      return {
        pageTypeId: effectivePageTypeId ?? NEVER_MATCH_VALUE,
        pageTypeSlug: rowPageTypeSlug,
        viewConfig,
        properties: rowProperties,
        viewId,
        viewUpdatedAt,
        gatingTargetSlugs: viewTargetSlugs.gating,
        displayTargetSlugs: viewTargetSlugs.display,
      }
    }
    return undefined
  }, [
    groupByPropertyId,
    rowPageTypeSlug,
    effectivePageTypeId,
    viewConfig,
    rowProperties,
    viewId,
    viewUpdatedAt,
    viewTargetSlugs,
  ])
  const flatResult = usePageViewQuery(
    flatQueryArgs ?? { pageTypeId: NEVER_MATCH_VALUE, viewConfig: undefined }
  )

  const groupedResult = useGroupByPaginatedQuery({
    pageTypeSlug:
      groupByPropertyId != null && rowPageTypeSlug != null && rowPageTypeSlug.length > 0
        ? rowPageTypeSlug
        : NEVER_MATCH_SLUG,
    groupPropertyId: groupByPropertyId ?? "",
    sortPropertyId:
      sortPropertyId != null && sortPropertyId.length > 0 ? sortPropertyId : undefined,
    sortDirection,
    filters: viewFilters,
    properties: rowProperties,
    groupGranularity: viewConfig?.group_granularity,
  })

  const { pages, loadMore, canLoadMore, isLoading, error, totalCount } = selectViewQueryResult({
    groupByPropertyId,
    rowPageTypeSlug,
    crossType: viewConfig?.crossTypeSource != null,
    flatResult,
    groupedResult,
  })

  const properties = useMemo<PropertyDefinition[]>(() => [...rowProperties], [rowProperties])

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

  const allPages = useMemo(() => {
    if (groupByPropertyId == null) return pages
    const out: PageWithProperties[] = []
    for (const [, group] of groupedResult.groups) out.push(...group.pages)
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

  const rowRollups = useViewRowRollups({
    pages: allPages,
    definitions: properties,
    relatedPages,
    propertiesByPageType,
  })

  const pageHrefById = useCallback(
    (id: string, opts?: { targetPageTypeId?: string }): string => {
      const findIn = (xs: readonly PageWithProperties[]) => xs.find((p) => p._id === id)
      const match = findIn(allPages) ?? findIn(relatedPages)
      const props = match?.properties
      const matchedPageTypeId = typeof props?.pageTypeId === "string" ? props.pageTypeId : undefined
      const resolvedPageTypeId = matchedPageTypeId ?? opts?.targetPageTypeId
      const pageTypeSlug =
        (resolvedPageTypeId != null ? pageTypeSlugById.get(resolvedPageTypeId) : undefined) ??
        rowPageTypeSlug
      const slug = typeof props?.slug === "string" ? props.slug : null
      const titleSource = typeof props?.title === "string" ? props.title : null
      return buildPageHref({
        pageTypeSlug: pageTypeSlug ?? PageTypeSlug("page"),
        slug,
        fallbackSlugSource: titleSource,
        id,
      })
    },
    [allPages, relatedPages, pageTypeSlugById, rowPageTypeSlug]
  )

  const resolveRowSlug = useCallback(
    (id: string) => resolveRowPageTypeSlug(rowPageTypeSlug, id, allPages, pageTypeSlugById),
    [rowPageTypeSlug, allPages, pageTypeSlugById]
  )

  const pageRows = useMemo<PageRow[]>(
    () =>
      pages.map((p) => {
        const aggregate = rowAggregates.get(p._id)
        const rollup = rowRollups.get(p._id)
        const props =
          aggregate === undefined && rollup === undefined
            ? p.properties
            : { ...p.properties, ...aggregate, ...rollup }
        return { ...toPageDataRecord(props), _id: p._id }
      }),
    [pages, rowAggregates, rowRollups]
  )

  const serverGrouped = useMemo<readonly ServerGroupedSection[] | undefined>(
    () =>
      buildServerGroupedSections({
        groupByPropertyId,
        properties,
        pageSets: [pageTypes, allPages, relatedPages],
        groups: groupedResult.groups,
        loadMore: groupedResult.loadMore,
        groupGranularity: viewConfig?.group_granularity,
      }),
    [
      groupByPropertyId,
      properties,
      pageTypes,
      allPages,
      relatedPages,
      viewConfig?.group_granularity,
      groupedResult.groups,
      groupedResult.loadMore,
    ]
  )

  return {
    viewConfig,
    effectiveConfig,
    effectivePageTypeId,
    effectivePageType,
    rowPageTypeSlug,
    properties,
    loadMore,
    canLoadMore,
    isLoading,
    error,
    totalCount,
    propertiesByPageType,
    pageTypePluralSlugById,
    allPages,
    relatedPages,
    rowAggregates,
    pageHrefById,
    resolveRowSlug,
    pageRows,
    serverGrouped,
  }
}
