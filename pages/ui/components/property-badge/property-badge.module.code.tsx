"use client"

import { BadgeLayoutProvider } from "@akasha/design-badges/badge-layout-context"
import { EmptyBadge } from "@akasha/design-badges/empty-badge"
import { Icon } from "@akasha/design-patterns/lucide-icon"
import { propertyTypeRendersWhenEmpty } from "@akasha/pages-core/property-types/registry"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import type { PageDataJSON, PropertyDefinition, PropertyType } from "@akasha/pages-core/types"

import { PROPERTY_BADGE_REGISTRY } from "@akasha/pages-ui-components/badge-registry"
import type { ComponentType } from "react"

export type PropertyBadgeContext = "card" | "detail" | "title"

export interface PropertyBadgeProps {
  property: PropertyDefinition
  value: PropertyValue
  context: PropertyBadgeContext
  editable?: boolean
  pageData?: PageDataJSON
  propertyDefinitions?: ReadonlyArray<PropertyDefinition>
  onPropertyChange?: (propertyId: string, value: PropertyValue, eventTimeStamp?: number) => void
  onPageNavigate?: (pageId: string) => void
  onRelationNavigate?: (propertyId: string) => void
  pageHref?: (pageId: string, opts?: { targetPageTypeId?: string }) => string
  relationHref?: (propertyId: string) => string
  onCardNavigate?: () => void
  onCreateOption?: (propertyId: string, label: string) => void
  pageId?: string
  pageTypeSlug?: string
  lookup?: (type: PropertyType) => ComponentType<PropertyBadgeProps>
}

export function isEmptyValue(type: PropertyType, value: PropertyValue): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === "string" && value === "") return true
  if (
    (type === "multi-select" || type === "multi-relation") &&
    Array.isArray(value) &&
    value.length === 0
  ) {
    return true
  }
  return false
}

function layoutForContext(context: PropertyBadgeContext): {
  truncate: "fixed" | "fluid"
  popoverAlign: "start" | "end"
} {
  if (context === "card") return { truncate: "fixed", popoverAlign: "start" }
  if (context === "title") return { truncate: "fixed", popoverAlign: "end" }
  return { truncate: "fluid", popoverAlign: "end" }
}

export function PropertyBadge(props: PropertyBadgeProps) {
  const { property, value, context, editable } = props

  if (
    !editable &&
    isEmptyValue(property.type, value) &&
    !propertyTypeRendersWhenEmpty(property.type)
  ) {
    return <EmptyBadge />
  }

  const layout = layoutForContext(context)
  const rawIcon = property.config?.icon
  const icon = typeof rawIcon === "string" && rawIcon !== "" ? <Icon name={rawIcon} /> : undefined
  const Component = PROPERTY_BADGE_REGISTRY[property.type]
  const lookup = (type: PropertyType) => PROPERTY_BADGE_REGISTRY[type]
  return (
    <BadgeLayoutProvider
      truncate={layout.truncate}
      popoverAlign={layout.popoverAlign}
      display={property.display}
      icon={icon}
    >
      <Component {...props} lookup={lookup} />
    </BadgeLayoutProvider>
  )
}
