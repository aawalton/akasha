"use client"

import { BadgeRow } from "@shared/design-badges/components/badge"
import { propertyTypeRendersWhenEmpty } from "@shared/pages-core/property-types/registry"
import { resolvePropertyVisibilityMode } from "@shared/pages-core/schema/view-data"
import { useMemo } from "react"
import type { PageDataJSON, PropertyDefinition } from "@shared/pages-core/types"
import { isEmptyValue, PropertyBadge } from "../property-types/property-badge.tsx"
import type { PropertyValue } from "../property-types/types.ts"
import { selectVisibleCardProperties } from "./page-properties-shared.ts"

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
  onCreateOption?: (propertyId: string, label: string) => void
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
  onCreateOption,
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

  const renderBadge = (def: PropertyDefinition) => {
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
        onCreateOption={onCreateOption}
      />
    )
  }

  return <BadgeRow>{bodyDefs.map((def) => renderBadge(def))}</BadgeRow>
}
