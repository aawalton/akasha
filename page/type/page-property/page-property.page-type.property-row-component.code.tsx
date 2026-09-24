"use client"

import { Icon } from "akasha/design/interface/pattern/modules/lucide-icon/lucide-icon.module.code.tsx"
import { PropertyBadge } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"
import type { PropertyRowProps } from "akasha/page/ui/component/modules/property-row/property-row.module.code.tsx"

export function Drawing(props: PropertyRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-7 w-36 shrink-0 items-center gap-2 text-secondary text-sm">
        <Icon name={props.property.icon} aria-hidden className="size-4 shrink-0" />
        <span className="truncate">{props.property.title}</span>
      </span>
      <div className="flex min-h-7 min-w-0 flex-1 flex-wrap items-center gap-1">
        <PropertyBadge {...props} context="row" />
      </div>
    </div>
  )
}
