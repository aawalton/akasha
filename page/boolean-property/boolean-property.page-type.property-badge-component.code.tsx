"use client"

import { CheckboxBadge } from "akasha/design/interface/badge/modules/checkbox-badge/checkbox-badge.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"

function isTruthy(value: unknown): boolean {
  return Boolean(value)
}

export function Drawing({ property, value, editable, onPropertyChange }: PropertyBadgeProps) {
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
