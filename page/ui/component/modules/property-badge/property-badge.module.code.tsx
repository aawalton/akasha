"use client"

import { BadgeLayoutProvider } from "akasha/design/interface/badge/modules/badge-layout-context/badge-layout-context.module.code.tsx"
import { EmptyBadge } from "akasha/design/interface/badge/modules/empty-badge/empty-badge.module.code.tsx"
import { Icon } from "akasha/design/interface/pattern/modules/lucide-icon/lucide-icon.module.code.tsx"
import type {
  PageDataJSON,
  PropertyDefinition,
  PropertyType,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PropertyValue } from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import { propertyTypeRendersWhenEmpty } from "akasha/page/core/property-type/modules/registry/registry.module.code.ts"
import {
  drawingAlong,
  PROPERTY_BADGE_DRAWINGS,
} from "akasha/page/ui/component/modules/property-badge-drawings/property-badge-drawings.module.code.ts"
import type { ComponentType } from "react"

const FALLS_BACK_TO = "page-property"

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
  pageId?: string
  pageTypeSlug?: string
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

function drawingFor(
  drawnBy: readonly string[] | undefined
): ComponentType<PropertyBadgeProps> | undefined {
  if (drawnBy === undefined) return undefined
  const short: string[] = []
  for (const slug of drawnBy) {
    if (slug === FALLS_BACK_TO) break
    short.push(slug)
  }
  return drawingAlong(short)
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
  const drawn = drawingFor(property.drawnBy)
  const Component: ComponentType<PropertyBadgeProps> | undefined =
    drawn ?? PROPERTY_BADGE_DRAWINGS.get(FALLS_BACK_TO)
  if (Component === undefined) return null
  return (
    <BadgeLayoutProvider
      truncate={layout.truncate}
      popoverAlign={layout.popoverAlign}
      display={property.display}
      icon={icon}
    >
      <Component {...props} />
    </BadgeLayoutProvider>
  )
}
