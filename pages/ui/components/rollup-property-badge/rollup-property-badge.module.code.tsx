"use client"

import { ComputedPropertyBadge } from "akasha/pages/ui/components/computed-property-badge/computed-property-badge.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/pages/ui/components/property-badge/property-badge.module.code.tsx"

export function RollupPropertyBadge(props: PropertyBadgeProps) {
  return <ComputedPropertyBadge {...props} />
}
