"use client"

import { Badge } from "@shared/design-badges/components/badge"

import type { PropertyDefinition } from "@shared/pages-core/types"
import { parseConfig } from "@shared/pages-core/schema/pages"
import { pathSelectConfigSchema } from "@shared/pages-core/schema/property-config-schemas"
import type { PropertyBadgeProps } from "./property-badge"
import type { PropertyValue } from "./types"

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
