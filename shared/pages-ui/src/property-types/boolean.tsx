"use client"

import { CheckboxBadge } from "@shared/design-badges/components/checkbox-badge"

import type { PropertyBadgeProps } from "./property-badge"

function isTruthy(value: unknown): boolean {
  return Boolean(value)
}

export function BooleanPropertyBadge({
  property,
  value,
  editable,
  onPropertyChange,
}: PropertyBadgeProps) {
  if (editable && onPropertyChange) {
    return (
      <CheckboxBadge
        checked={isTruthy(value)}
        aria-label={property.title}
        onChange={(c) => onPropertyChange(property.id, c)}
      />
    )
  }
  return <CheckboxBadge checked={isTruthy(value)} aria-label={property.title} />
}
