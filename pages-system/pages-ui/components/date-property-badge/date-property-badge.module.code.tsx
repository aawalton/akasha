"use client"

import { Badge } from "@akasha/design-badges/badge"
import { resolveBadgeVariant } from "@akasha/pages-core/color-rules"
import type { BadgeVariant } from "@akasha/pages-core/schema/color-rule"
import { formatSmartDate } from "@akasha/pages-core/view/format-smart-date"
import { DateBadge as DetailDateBadge } from "@akasha/pages-ui-components/page-detail-properties-shared"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"

export function DatePropertyBadge({
  property,
  value,
  editable,
  pageData,
  onPropertyChange,
}: PropertyBadgeProps) {
  const accentVariant: BadgeVariant = property.accent ? "accent" : "elevation-muted"
  const variant = resolveBadgeVariant(property, pageData ?? {}, value) ?? accentVariant

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
