"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { resolveBadgeVariant } from "@shared/pages-core/color-rules"
import { DateBadge as DetailDateBadge } from "../components/page-detail-properties-shared"
import type { BadgeVariant } from "@shared/pages-core/schema/color-rule"
import { formatSmartDate } from "@shared/pages-core/view/format-smart-date"
import type { PropertyBadgeProps } from "./property-badge"

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
