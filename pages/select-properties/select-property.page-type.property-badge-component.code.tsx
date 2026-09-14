"use client"

import type { PropertyBadgeProps } from "akasha/pages/ui/components/modules/property-badge/property-badge.module.code.tsx"
import { SelectPropertyBadge } from "akasha/pages/ui/components/modules/select-property-badge/select-property-badge.module.code.tsx"

export function Drawing(props: PropertyBadgeProps) {
  return <SelectPropertyBadge {...props} />
}
