"use client"

import { ComputedPropertyBadge } from "./computed-property-badge.tsx"
import type { PropertyBadgeProps } from "./property-badge.tsx"

export function FormulaPropertyBadge(props: PropertyBadgeProps) {
  return <ComputedPropertyBadge {...props} />
}
