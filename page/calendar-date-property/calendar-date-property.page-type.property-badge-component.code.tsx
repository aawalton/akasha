"use client"

import { Badge } from "akasha/design/interfaces/design-interface-badge/modules/badge/badge.module.code.tsx"
import { resolveBadgeVariant } from "akasha/page/core/modules/resolve-badge-variant/resolve-badge-variant.module.code.ts"
import type { BadgeVariant } from "akasha/page/core/schema/modules/color-rule-variant/color-rule-variant.module.code.ts"
import { formatSmartDate } from "akasha/page/core/view/modules/format-smart-date/format-smart-date.module.code.ts"
import { DateBadge as DetailDateBadge } from "akasha/page/ui/component/modules/page-detail-properties-shared/page-detail-properties-shared.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"

export function Drawing({ property, value, editable, onPropertyChange }: PropertyBadgeProps) {
  const accentVariant: BadgeVariant = property.accent ? "accent" : "elevation-muted"
  const variant = resolveBadgeVariant(property, value) ?? accentVariant

  if (editable && onPropertyChange) {
    return (
      <DetailDateBadge
        value={value}
        variant={variant}
        onChange={(v) => onPropertyChange(property.id, v)}
      />
    )
  }

  if (typeof value !== "string" || value === "") {
    return <Badge variant="elevation-muted">—</Badge>
  }
  return <Badge variant={variant}>{formatSmartDate(value)}</Badge>
}
