"use client"

import { parsePageTypeData } from "@akasha/pages-core/schema/pages"
import { parseQuickAddConfig, type QuickAddConfig } from "@akasha/pages-core/schema/quick-add"
import { resolveDefinitionOptions } from "@akasha/pages-core/schema/resolve-select-options"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { useAllPages } from "@akasha/pages-ui/supabase/hooks"
import { useOptionListLookup } from "@akasha/pages-ui/supabase/use-option-list-lookup"
import { useMemo } from "react"

const PAGE_TYPE_SLUG = "page-type"

export interface ActiveQuickAddPageType {
  readonly pageTypeSlug: string
  readonly pageTypeId: string
  readonly displayName: string
  readonly quickAdd: QuickAddConfig
  readonly propertyDefinitions: readonly PropertyDefinition[]
}

function titlecaseFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter((part) => part.length > 0)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ")
}

export function useActiveQuickAddPageType(): ActiveQuickAddPageType | null {
  const { pathname } = usePagesUIRouter()
  const { pages: pageTypes } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })
  const lookupOptionList = useOptionListLookup()

  const firstSegment = useMemo<string | null>(() => {
    if (pathname === "" || pathname === "/") return null
    const stripped = pathname.startsWith("/") ? pathname.slice(1) : pathname
    const seg = stripped.split("/")[0]
    if (seg === undefined || seg.length === 0) return null
    try {
      return decodeURIComponent(seg)
    } catch {
      return seg
    }
  }, [pathname])

  return useMemo<ActiveQuickAddPageType | null>(() => {
    if (firstSegment === null) return null
    const row = pageTypes.find((pt) => {
      const pluralSlug = pt.properties?.pluralSlug
      return typeof pluralSlug === "string" && pluralSlug === firstSegment
    })
    if (row === undefined) return null

    const slug = row.properties?.slug
    const singularSlug = typeof slug === "string" ? slug : firstSegment
    const rawDisplayName = row.properties?.displayName
    const displayName =
      typeof rawDisplayName === "string" && rawDisplayName.length > 0
        ? rawDisplayName
        : titlecaseFromSlug(singularSlug)
    const quickAdd = parseQuickAddConfig(row.properties?.quickAdd) ?? {
      titlePropertyId: "title",
    }
    const { propertyDefinitions } = parsePageTypeData(row.properties)

    return {
      pageTypeSlug: singularSlug,
      pageTypeId: row._id,
      displayName,
      quickAdd,
      propertyDefinitions: propertyDefinitions.map((d) =>
        resolveDefinitionOptions(d, lookupOptionList)
      ),
    }
  }, [firstSegment, pageTypes, lookupOptionList])
}
