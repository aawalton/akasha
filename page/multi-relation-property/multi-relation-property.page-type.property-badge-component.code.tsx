"use client"

import { MultiRelationPropertyBadge } from "akasha/page/ui/component/modules/multi-relation-property-badge/multi-relation-property-badge.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"

export function Drawing(props: PropertyBadgeProps) {
  return <MultiRelationPropertyBadge {...props} />
}
