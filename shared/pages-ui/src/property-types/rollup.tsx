"use client"

import { ComputedPropertyBadge } from "./computed-property-badge"
import type { PropertyBadgeProps } from "./property-badge"

export function RollupPropertyBadge(props: PropertyBadgeProps) {
  return <ComputedPropertyBadge {...props} />
}
