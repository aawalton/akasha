"use client"

import type {
  PageDataJSON,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PropertyValue } from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import {
  drawingAlong,
  PROPERTY_ROW_DRAWINGS,
} from "akasha/page/ui/component/modules/property-row-drawings/property-row-drawings.module.code.ts"
import type { ComponentType } from "react"

const FALLS_BACK_TO = "page-property"

export interface PropertyRowProps {
  property: PropertyDefinition
  value: PropertyValue
  editable?: boolean
  pageData?: PageDataJSON
  propertyDefinitions?: ReadonlyArray<PropertyDefinition>
  onPropertyChange?: (propertyId: string, value: PropertyValue, eventTimeStamp?: number) => void
  onPageNavigate?: (pageId: string) => void
  pageId?: string
  pageTypeSlug?: string
}

export function PropertyRow(props: PropertyRowProps) {
  const Component: ComponentType<PropertyRowProps> | undefined =
    drawingAlong(props.property.drawnBy) ?? PROPERTY_ROW_DRAWINGS.get(FALLS_BACK_TO)
  if (Component === undefined) return null
  return <Component {...props} />
}
