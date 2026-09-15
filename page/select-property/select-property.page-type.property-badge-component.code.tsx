"use client"

import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"
import { SelectPropertyBadge } from "akasha/page/ui/component/modules/select-property-badge/select-property-badge.module.code.tsx"

export function Drawing(props: PropertyBadgeProps) {
  return <SelectPropertyBadge {...props} />
}
