"use client"

import { ComputedPropertyBadge } from "akasha/pages/ui/components/modules/computed-property-badge/computed-property-badge.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/pages/ui/components/property-badge/property-badge.module.code.tsx"

export function AggregatePropertyBadge(props: PropertyBadgeProps) {
  return <ComputedPropertyBadge {...props} />
}
