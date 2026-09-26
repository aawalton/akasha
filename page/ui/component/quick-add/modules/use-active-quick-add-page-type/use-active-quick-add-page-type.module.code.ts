"use client"

import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { parsePageTypeData } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import {
  parseQuickAddConfig,
  type QuickAddConfig,
} from "akasha/page/core/schema/modules/quick-add/quick-add.module.code.ts"
import { usePagesUIRouter } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { usePageTypeNamed } from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import { useMemo } from "react"

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
  const { pageType: row } = usePageTypeNamed(firstSegment)

  return useMemo<ActiveQuickAddPageType | null>(() => {
    if (firstSegment === null || row === null) return null

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
      propertyDefinitions,
    }
  }, [firstSegment, row])
}
