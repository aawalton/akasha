"use client"

import { ComputedPropertyBadge } from "./computed-property-badge"
import type { PropertyBadgeProps } from "./property-badge"

export function AggregatePropertyBadge(props: PropertyBadgeProps) {
  return <ComputedPropertyBadge {...props} />
}
