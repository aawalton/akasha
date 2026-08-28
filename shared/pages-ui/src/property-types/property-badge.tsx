"use client"

import { BadgeLayoutProvider } from "@shared/design-badges/components/badge-layout-context"
import { EmptyBadge } from "@shared/design-badges/components/empty-badge"
import { Icon } from "@shared/design-patterns/components/icon"
import type { PageDataJSON, PropertyDefinition, PropertyType } from "@shared/pages-core/types"
import { propertyTypeRendersWhenEmpty } from "@shared/pages-core/property-types/registry"
import type { ComponentType } from "react"

import { propertyBadgeRegistry } from "./badge-registry.ts"
import type { PropertyValue } from "./types.ts"

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
  const Component = propertyBadgeRegistry[property.type]
  const lookup = (type: PropertyType) => propertyBadgeRegistry[type]
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
