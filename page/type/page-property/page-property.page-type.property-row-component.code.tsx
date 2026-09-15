"use client"

import { PropertyBadge } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"
import type { PropertyRowProps } from "akasha/page/ui/component/modules/property-row/property-row.module.code.tsx"

export function Drawing(props: PropertyRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="min-w-28 shrink-0 text-secondary text-sm">{props.property.title}</span>
      <div className="flex flex-wrap justify-end gap-1">
        <PropertyBadge {...props} context="detail" />
      </div>
    </div>
  )
}
