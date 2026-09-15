"use client"

import { JsonPropertyBadge } from "akasha/page/ui/components/modules/json-property-badge/json-property-badge.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/page/ui/components/modules/property-badge/property-badge.module.code.tsx"

export function Drawing(props: PropertyBadgeProps) {
  return <JsonPropertyBadge {...props} />
}
