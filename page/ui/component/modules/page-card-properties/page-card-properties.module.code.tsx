"use client"

import { BadgeRow } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import type {
  PageDataJSON,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PropertyValue } from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import { propertyTypeRendersWhenEmpty } from "akasha/page/core/property-type/modules/registry/registry.module.code.ts"
import { resolvePropertyVisibilityMode } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { selectVisibleCardProperties } from "akasha/page/ui/component/modules/card-property-columns/card-property-columns.module.code.ts"
import {
  isEmptyValue,
  PropertyBadge,
} from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"
import { useMemo } from "react"

interface PageCardPropertiesProps {
  definitions?: readonly PropertyDefinition[]
  data?: PageDataJSON
  visiblePropertyIds?: readonly string[]
  alwaysShowPropertyIds?: readonly string[]
  onPropertyChange?: (propertyId: string, value: unknown, eventTimeStamp?: number) => void
  onPageNavigate?: (pageId: string) => void
  onRelationNavigate?: (propertyId: string) => void
  pageHref?: (pageId: string, opts?: { targetPageTypeId?: string }) => string
  relationHref?: (propertyId: string) => string
  onCardNavigate?: () => void
  pageId?: string
  pageTypeSlug?: string
}

export function PageCardProperties({
  definitions,
  data,
  visiblePropertyIds,
  alwaysShowPropertyIds,
  onPropertyChange,
  onPageNavigate,
  onRelationNavigate,
  pageHref,
  relationHref,
  onCardNavigate,
  pageId,
  pageTypeSlug,
}: PageCardPropertiesProps) {
  const bodyDefs = useMemo(
    () => selectVisibleCardProperties(definitions ?? [], visiblePropertyIds ?? []),
    [definitions, visiblePropertyIds]
  )
  const enrichedData = data ?? null

  const hasBadges = bodyDefs.length > 0 && enrichedData

  if (!hasBadges) return null

  const wrappedOnPropertyChange = onPropertyChange
    ? (propertyId: string, value: PropertyValue, eventTimeStamp?: number) =>
        onPropertyChange(propertyId, value, eventTimeStamp)
    : undefined

  const RenderBadge = (def: PropertyDefinition) => {
    if (enrichedData === null) return null
    const value = enrichedData[def.id] ?? null
    const mode = resolvePropertyVisibilityMode(def.id, {
      visibleProperties: visiblePropertyIds ?? [],
      alwaysShowProperties: alwaysShowPropertyIds ?? [],
    })
    if (
      mode !== "always-show" &&
      isEmptyValue(def.type, value) &&
      !propertyTypeRendersWhenEmpty(def.type)
    ) {
      return null
    }
    return (
      <PropertyBadge
        key={def.id}
        property={def}
        value={value}
        context="card"
        editable
        pageData={enrichedData}
        propertyDefinitions={definitions}
        pageId={pageId}
        pageTypeSlug={pageTypeSlug}
        onPropertyChange={wrappedOnPropertyChange}
        onPageNavigate={onPageNavigate}
        onRelationNavigate={onRelationNavigate}
        pageHref={pageHref}
        relationHref={relationHref}
        onCardNavigate={onCardNavigate}
      />
    )
  }

  return <BadgeRow>{bodyDefs.map((def) => RenderBadge(def))}</BadgeRow>
}
