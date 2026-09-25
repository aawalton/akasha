"use client"

import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import {
  buildRelationBackLinkHref,
  readRelationConfig,
} from "akasha/page/ui/component/modules/view-tab-content-href/view-tab-content-href.module.code.ts"
import type { PageRow } from "akasha/page/ui/component/view-engine/modules/view-row/view-row.module.code.ts"
import {
  type PageWithProperties,
  pageById,
} from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useCallback } from "react"

interface PagesFilteredHrefs {
  buildRowHref: (row: PageRow) => string
  pageHrefById: (id: string, opts?: { targetPageTypeId?: string }) => string
  makeRelationHref: (rowId: string, rowHref: string) => (propertyId: string) => string
}

export function usePagesFilteredHrefs(args: {
  pageTypeSlug: PageTypeSlug
  allPages: readonly PageWithProperties[]
  relatedPages: readonly PageWithProperties[]
  pageTypeSlugById: ReadonlyMap<string, PageTypeSlug>
  properties: readonly PropertyDefinition[]
}): PagesFilteredHrefs {
  const { pageTypeSlug, allPages, relatedPages, pageTypeSlugById, properties } = args

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
      const match = pageById(allPages, id) ?? pageById(relatedPages, id)
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
          slugById: pageTypeSlugById,
        })
      },
    [properties, pageTypeSlugById]
  )

  return {
    buildRowHref,
    pageHrefById,
    makeRelationHref,
  }
}
