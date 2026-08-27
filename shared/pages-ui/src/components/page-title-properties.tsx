"use client"

import { resolveComputedProperties } from "@shared/pages-core/formula/resolve"
import { propertyTypeRendersWhenEmpty } from "@shared/pages-core/property-types/registry"
import { useMemo } from "react"
import type { PageDataJSON, PropertyDefinition } from "@shared/pages-core/types"
import { isEmptyValue, PropertyBadge } from "../property-types/property-badge"
import { selectVisibleCardProperties } from "./page-properties-shared"
import { useLiveNow } from "./use-live-now"

interface PageTitlePropertiesProps {
  pageId?: string
  pageTypeSlug?: string
  data?: PageDataJSON
  definitions?: readonly PropertyDefinition[]
  titlePropertyIds?: readonly string[]
  liveRefreshMs?: number
}

export function PageTitleProperties({
  pageId,
  pageTypeSlug,
  data,
  definitions,
  titlePropertyIds,
  liveRefreshMs,
}: PageTitlePropertiesProps) {
  const bodyDefs = useMemo(
    () => selectVisibleCardProperties(definitions ?? [], titlePropertyIds ?? []),
    [definitions, titlePropertyIds]
  )
  const now = useLiveNow(bodyDefs, liveRefreshMs)
  const enrichedData = useMemo(
    () => (data && definitions ? resolveComputedProperties(data, definitions, { now }) : null),
    [data, definitions, now]
  )

  const hasBadges = bodyDefs.length > 0 && enrichedData
  if (!hasBadges) return null

  const renderBadge = (def: PropertyDefinition) => {
    if (enrichedData === null) return null
    const value = enrichedData[def.id] ?? null
    if (isEmptyValue(def.type, value) && !propertyTypeRendersWhenEmpty(def.type)) {
      return null
    }
    return (
      <PropertyBadge
        key={def.id}
        property={def}
        value={value}
        context="title"
        editable={false}
        pageData={enrichedData}
        propertyDefinitions={definitions}
        pageId={pageId}
        pageTypeSlug={pageTypeSlug}
      />
    )
  }

  return <div className="flex flex-wrap items-center gap-2">{bodyDefs.map(renderBadge)}</div>
}
