"use client"

import { patchPropertyDefinitionById } from "@shared/pages-access/property-definition"
import { type IconName } from "@shared/pages-core/icon"
import { computeAggregatesForPage } from "@shared/pages-core/property-types/aggregate"
import { type PageTypePropertiesMap } from "@shared/pages-core/property-types/rollup"
import { parsePageTypeData } from "@shared/pages-core/schema/pages"
import { resolveDefinitionOptions } from "@shared/pages-core/schema/resolve-select-options"
import { type PropertyDefinition } from "@shared/pages-core/types"
import { buildPageHref, PageTypeSlug } from "@shared/pages-url"
import { useCallback, useMemo } from "react"
import { useHostCreateSelectOption } from "../option-create-context.tsx"
import { usePagesUIRouter } from "../router-context.tsx"
import { useAllPages, useRelatedPages } from "../supabase/hooks.ts"
import { useOptimisticPatchPropertyDefinition } from "../supabase/mutations/use-optimistic-patch-property-definition.ts"
import { useOptionListLookup } from "../supabase/use-option-list-lookup.ts"
import { usePage } from "../supabase/use-page.ts"
import { useSetPropertyOptimistic } from "../supabase/use-set-property-optimistic.tsx"
import { createOptionOnDefinition } from "./create-option.ts"
import { toAggregateInputs, toPageDataJSON, toPageDataRecord } from "./page-data-json.ts"
import {
  DETAIL_EXCLUDED_IDS,
  extractPageTypeId,
  PAGE_TYPE_SLUG,
} from "./page-detail-content-helpers.ts"

export function usePageDefaultContent({
  pageTypeSlug,
  id,
}: {
  pageTypeSlug: PageTypeSlug
  id: string
}) {
  const router = usePagesUIRouter()
  const patchDefinition = useOptimisticPatchPropertyDefinition((args) =>
    patchPropertyDefinitionById(args)
  )
  const hostCreateOption = useHostCreateSelectOption()
  const { page, isLoading } = usePage({ pageTypeSlug, id })
  const { pages: pageTypes } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })

  const rawPageTypeId = page?.properties?.pageTypeId
  const pageTypeId = extractPageTypeId(rawPageTypeId)

  const pageType = pageTypes.find((pt) => pt.properties?.slug === pageTypeSlug)
  const targetSlug =
    typeof pageType?.properties?.slug === "string" ? pageType.properties.slug : undefined

  const lookupOptionList = useOptionListLookup()
  const allDefinitions = useMemo<readonly PropertyDefinition[]>(
    () =>
      parsePageTypeData(pageType?.properties).propertyDefinitions.map((d) =>
        resolveDefinitionOptions(d, lookupOptionList)
      ),
    [pageType, lookupOptionList]
  )

  const pagesForRelation = useMemo(() => (page ? [{ properties: page.properties }] : []), [page])
  const pageTypeSlugById = useMemo<ReadonlyMap<string, PageTypeSlug>>(() => {
    const map = new Map<string, PageTypeSlug>()
    for (const pt of pageTypes) {
      const slug = pt.properties?.slug
      if (typeof slug === "string" && slug.length > 0) map.set(pt._id, PageTypeSlug(slug))
    }
    return map
  }, [pageTypes])
  const relatedPages = useRelatedPages({
    definitions: allDefinitions,
    pages: pagesForRelation,
    pageTypeSlugById,
  })

  const propertyListDefs = useMemo(
    () =>
      allDefinitions.filter(
        (d) =>
          d.type !== "markdown" &&
          d.type !== "json" &&
          d.type !== "multi-relation" &&
          d.type !== "rich-document" &&
          !DETAIL_EXCLUDED_IDS.has(d.id)
      ),
    [allDefinitions]
  )

  const richDocumentDefs = useMemo(
    () =>
      allDefinitions.filter((d) => d.type === "rich-document" && !DETAIL_EXCLUDED_IDS.has(d.id)),
    [allDefinitions]
  )

  const multiRelationDefs = useMemo(
    () =>
      allDefinitions.filter((d) => d.type === "multi-relation" && !DETAIL_EXCLUDED_IDS.has(d.id)),
    [allDefinitions]
  )

  const markdownDefs = useMemo(
    () => allDefinitions.filter((d) => d.type === "markdown" && !DETAIL_EXCLUDED_IDS.has(d.id)),
    [allDefinitions]
  )

  const jsonDefs = useMemo(
    () => allDefinitions.filter((d) => d.type === "json" && !DETAIL_EXCLUDED_IDS.has(d.id)),
    [allDefinitions]
  )

  const data = useMemo(() => toPageDataJSON(page?.properties), [page?.properties])

  const pageTypePropertiesMap = useMemo<PageTypePropertiesMap>(() => {
    const map = new Map<string, readonly PropertyDefinition[]>()
    for (const pt of pageTypes) {
      map.set(
        pt._id,
        parsePageTypeData(pt.properties).propertyDefinitions.map((d) =>
          resolveDefinitionOptions(d, lookupOptionList)
        )
      )
    }
    return map
  }, [pageTypes, lookupOptionList])
  const aggregateInputs = useMemo(() => toAggregateInputs(relatedPages), [relatedPages])
  const dataWithComputed = useMemo(() => {
    const aggregates = computeAggregatesForPage(data, allDefinitions, aggregateInputs)
    return toPageDataJSON({ ...toPageDataRecord(page?.properties), ...aggregates })
  }, [page?.properties, data, allDefinitions, aggregateInputs])

  const setProperty = useSetPropertyOptimistic()

  const handlePropertyChange = (propertyId: string, value: unknown) => {
    if (targetSlug == null) return
    setProperty({ pageTypeSlug: targetSlug, pageId: id, propertyId, value })
  }

  const handleTitleChange = (title: string) => {
    if (targetSlug == null) return
    setProperty({ pageTypeSlug: targetSlug, pageId: id, propertyId: "title", value: title })
  }

  const handleIconChange = (icon: IconName) => {
    if (targetSlug == null) return
    setProperty({ pageTypeSlug: targetSlug, pageId: id, propertyId: "icon", value: icon })
  }

  const handleCoverChange = (url: string | null) => {
    if (targetSlug == null) return
    setProperty({ pageTypeSlug: targetSlug, pageId: id, propertyId: "cover", value: url })
  }

  const coverUrl = typeof data.cover === "string" && data.cover.length > 0 ? data.cover : null

  const ownIconName = typeof data.icon === "string" ? data.icon : null
  const pageTypeIconName =
    typeof pageType?.properties?.icon === "string" ? pageType.properties.icon : null
  const displayIconName = ownIconName ?? pageTypeIconName ?? null

  const handleReorderProperties = useCallback(
    (orderedIds: readonly string[]) => {
      if (!pageType) return
      const idSet = new Set(orderedIds)
      const slots: number[] = []
      for (const [i, def] of allDefinitions.entries()) {
        if (idSet.has(def.id)) slots.push(i)
      }
      const orderedDefs = orderedIds
        .map((oid) => allDefinitions.find((d) => d.id === oid))
        .filter((d): d is PropertyDefinition => d != null)
      const result = [...allDefinitions]
      const pairCount = Math.min(slots.length, orderedDefs.length)
      for (const [i, slot] of slots.slice(0, pairCount).entries()) {
        const def = orderedDefs[i]
        if (def === undefined) continue
        result[slot] = def
      }
      void Promise.all(
        result.map((def, i) => {
          if (def.pageId == null) return null
          return patchDefinition({
            where: [{ key: "id", eq: def.pageId }],
            set: { defaultOrder: i },
          })
        })
      )
    },
    [pageType, allDefinitions, patchDefinition]
  )

  const handleCreateOption = useCallback(
    (propertyId: string, label: string) => {
      if (targetSlug == null) return
      return createOptionOnDefinition({
        patch: patchDefinition,
        createOption: hostCreateOption ?? undefined,
        properties: allDefinitions,
        rowPageTypeSlug: targetSlug,
        setProperty,
        pageId: id,
        pageData: data,
        propertyId,
        label,
      })
    },
    [allDefinitions, patchDefinition, hostCreateOption, setProperty, id, data, targetSlug]
  )

  const handlePageNavigate = useCallback(
    (pageId: string) => {
      const match = relatedPages.find((p) => p._id === pageId)
      if (!match) return
      const props = match.properties
      const statedSlug = typeof props?.pageTypeSlug === "string" ? props.pageTypeSlug : null
      const matchedPageTypeId = extractPageTypeId(props?.pageTypeId)
      const resolvedPageTypeSlug =
        statedSlug !== null && statedSlug.length > 0
          ? PageTypeSlug(statedSlug)
          : matchedPageTypeId != null
            ? pageTypeSlugById.get(matchedPageTypeId)
            : undefined
      if (resolvedPageTypeSlug == null) return
      const slug = typeof props?.slug === "string" ? props.slug : null
      const titleSource = typeof props?.title === "string" ? props.title : null
      router.push(
        buildPageHref({
          pageTypeSlug: resolvedPageTypeSlug,
          slug,
          fallbackSlugSource: titleSource,
          id: pageId,
        })
      )
    },
    [relatedPages, pageTypeSlugById, router]
  )

  return {
    page,
    isLoading,
    pageTypes,
    relatedPages,
    targetSlug,
    data,
    dataWithComputed,
    coverUrl,
    handleCoverChange,
    displayIconName,
    handleIconChange,
    handleTitleChange,
    handlePropertyChange,
    handlePageNavigate,
    handleReorderProperties,
    handleCreateOption,
    propertyListDefs,
    richDocumentDefs,
    multiRelationDefs,
    markdownDefs,
    jsonDefs,
    pageTypeId,
    pageTypePropertiesMap,
    pageTypeSlugById,
    allDefinitions,
  }
}
