"use client"

import { resolveBadgeVariant } from "@akasha/pages-core/resolve-badge-variant"
import type { BadgeVariant } from "@akasha/pages-core/schema/color-rule-variant"
import { formatSmartDate } from "@akasha/pages-core/view/format-smart-date"
import { DateBadge as DetailDateBadge } from "@akasha/pages-ui/components/page-detail-properties-shared"
import type { PropertyBadgeProps } from "@akasha/pages-ui/components/property-badge"
import { Badge } from "akasha/design/badges/badge/badge.module.code.tsx"

export function DatePropertyBadge({
  property,
  value,
  editable,
  onPropertyChange,
}: PropertyBadgeProps) {
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
