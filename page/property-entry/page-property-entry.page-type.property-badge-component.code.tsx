"use client"

import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"
import { RecordPropertyBadge } from "akasha/page/ui/component/modules/record-property-badge/record-property-badge.module.code.tsx"

export function Drawing(props: PropertyBadgeProps) {
  return <RecordPropertyBadge {...props} />
}
