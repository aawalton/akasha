"use client"

import type { PropertyDefinition } from "@shared/pages-core/types"
import { buildPageHref, type PageTypeSlug } from "@shared/pages-url"
import { useCallback } from "react"
import type { PageWithProperties } from "../supabase/types"
import type { PageRow } from "../view-engine/page-row"
import { buildRelationBackLinkHref, readRelationConfig } from "./view-tab-content-href"

export interface PagesFilteredHrefs {
  buildRowHref: (row: PageRow) => string
  pageHrefById: (id: string, opts?: { targetPageTypeId?: string }) => string
  makeRelationHref: (rowId: string, rowHref: string) => (propertyId: string) => string
}

export function usePagesFilteredHrefs(args: {
  pageTypeSlug: PageTypeSlug
  allPages: readonly PageWithProperties[]
  relatedPages: readonly PageWithProperties[]
  pageTypeSlugById: ReadonlyMap<string, PageTypeSlug>
  pageTypePluralSlugById: ReadonlyMap<string, string>
  properties: readonly PropertyDefinition[]
}): PagesFilteredHrefs {
  const {
    pageTypeSlug,
    allPages,
    relatedPages,
    pageTypeSlugById,
    pageTypePluralSlugById,
    properties,
  } = args

  const buildRowHref = useCallback(
    (row: PageRow): string => {
      const slug = typeof row.slug === "string" ? row.slug : null
      const titleSource = typeof row.title === "string" ? row.title : null
      return buildPageHref({
        pageTypeSlug,
        slug,
        fallbackSlugSource: titleSource,
        id: row._id,
      })
    },
    [pageTypeSlug]
  )

  const pageHrefById = useCallback(
    (id: string, opts?: { targetPageTypeId?: string }): string => {
      const findIn = (xs: readonly PageWithProperties[]) => xs.find((p) => p._id === id)
      const match = findIn(allPages) ?? findIn(relatedPages)
      const props = match?.properties
      const matchedPageTypeId = typeof props?.pageTypeId === "string" ? props.pageTypeId : undefined
      const resolvedPageTypeId = matchedPageTypeId ?? opts?.targetPageTypeId
      const resolvedPageTypeSlug =
        (resolvedPageTypeId != null ? pageTypeSlugById.get(resolvedPageTypeId) : undefined) ??
        pageTypeSlug
      const slug = typeof props?.slug === "string" ? props.slug : null
      const titleSource = typeof props?.title === "string" ? props.title : null
      return buildPageHref({
        pageTypeSlug: resolvedPageTypeSlug,
        slug,
        fallbackSlugSource: titleSource,
        id,
      })
    },
    [allPages, relatedPages, pageTypeSlugById, pageTypeSlug]
  )

  const makeRelationHref = useCallback(
    (rowId: string, rowHref: string) =>
      (propertyId: string): string => {
        const def = properties.find((d: PropertyDefinition) => d.id === propertyId)
        return buildRelationBackLinkHref({
          target: def ? readRelationConfig(def.config) : undefined,
          rowId,
          fallbackHref: rowHref,
          pluralSlugById: pageTypePluralSlugById,
        })
      },
    [properties, pageTypePluralSlugById]
  )

  return {
    buildRowHref,
    pageHrefById,
    makeRelationHref,
  }
}
