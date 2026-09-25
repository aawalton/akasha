"use client"

import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { parsePageTypeData } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import {
  parseQuickAddConfig,
  type QuickAddConfig,
} from "akasha/page/core/schema/modules/quick-add/quick-add.module.code.ts"
import { resolveDefinitionOptions } from "akasha/page/core/schema/modules/resolve-select-options/resolve-select-options.module.code.ts"
import { usePagesUIRouter } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { useAllPages } from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import { useOptionListLookup } from "akasha/page/ui/supabase/modules/use-option-list-lookup/use-option-list-lookup.module.code.ts"
import { useMemo } from "react"

const PAGE_TYPE_SLUG = "page-type"

interface ActiveQuickAddPageType {
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
      const slug = pt.properties?.slug
      return typeof slug === "string" && slug === firstSegment
    })
    if (row === undefined) return null

    const rawSlug = row.properties?.slug
    const pageTypeSlug = typeof rawSlug === "string" ? rawSlug : firstSegment
    const rawDisplayName = row.properties?.displayName
    const displayName =
      typeof rawDisplayName === "string" && rawDisplayName.length > 0
        ? rawDisplayName
        : titlecaseFromSlug(pageTypeSlug)
    const quickAdd = parseQuickAddConfig(row.properties?.quickAdd) ?? {
      titlePropertyId: "title",
    }
    const { propertyDefinitions } = parsePageTypeData(row.properties)

    return {
      pageTypeSlug,
      pageTypeId: row._id,
      displayName,
      quickAdd,
      propertyDefinitions: propertyDefinitions.map((d) =>
        resolveDefinitionOptions(d, lookupOptionList)
      ),
    }
  }, [firstSegment, pageTypes, lookupOptionList])
}
