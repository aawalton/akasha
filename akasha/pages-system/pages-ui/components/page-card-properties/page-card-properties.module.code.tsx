"use client"

import { BadgeRow } from "@akasha/design-badges/badge"
import { propertyTypeRendersWhenEmpty } from "@akasha/pages-core/property-types/registry"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import { resolvePropertyVisibilityMode } from "@akasha/pages-core/schema/view-data"
import type { PageDataJSON, PropertyDefinition } from "@akasha/pages-core/types"
import { selectVisibleCardProperties } from "@akasha/pages-ui-components/card-property-columns"
import { isEmptyValue, PropertyBadge } from "@akasha/pages-ui-components/property-badge"
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
        onCreateOption={onCreateOption}
      />
    )
  }

  return <BadgeRow>{bodyDefs.map((def) => RenderBadge(def))}</BadgeRow>
}
