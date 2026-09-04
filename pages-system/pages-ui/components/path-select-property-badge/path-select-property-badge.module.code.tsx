"use client"

import { Badge } from "@akasha/design-badges/badge"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import { parseConfig } from "@akasha/pages-core/schema/pages"
import { pathSelectConfigSchema } from "@akasha/pages-core/schema/property-config-schemas"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"

const DEFAULT_SEPARATOR = " > "

type PathSegment = string | number

function isPathSegment(value: unknown): value is PathSegment {
  return typeof value === "string" || typeof value === "number"
}

function getValueArray(value: PropertyValue): readonly PathSegment[] {
  if (!Array.isArray(value)) return []
  return value.filter(isPathSegment)
}

function getSeparator(definition: PropertyDefinition): string {
  return (
    parseConfig(pathSelectConfigSchema, definition.config, { providerId: "" }).separator ??
    DEFAULT_SEPARATOR
  )
}

export function PathSelectPropertyBadge({ property, value }: PropertyBadgeProps) {
  const segments = getValueArray(value)
  const accentVariant = property.accent ? "accent" : "elevation-muted"

  if (segments.length === 0) return null

  const separator = getSeparator(property)
  return <Badge variant={accentVariant}>{segments.map(String).join(separator)}</Badge>
}
