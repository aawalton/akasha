"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { TimeBadge } from "@shared/design-badges/components/time-badge"
import { formatTime12h } from "@shared/design-forms/utils/format-time"
import { resolveBadgeVariant } from "@shared/pages-core/color-rules"

import type { BadgeVariant } from "@shared/pages-core/schema/color-rule"
import type { PropertyBadgeProps } from "./property-badge"
import type { PropertyValue } from "./types"

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/

function asTimeString(value: PropertyValue): string | null {
  if (typeof value !== "string" || !TIME_REGEX.test(value)) return null
  return value
}

export function CalendarTimePropertyBadge({
  property,
  value,
  context,
  editable,
  pageData,
  onPropertyChange,
}: PropertyBadgeProps) {
  const accentVariant: BadgeVariant = property.accent ? "accent" : "elevation-muted"
  const variant = resolveBadgeVariant(property, pageData ?? {}, value) ?? accentVariant
  const time = asTimeString(value)

  if (editable && onPropertyChange) {
    return (
      <TimeBadge
        editable
        value={time}
        variant={variant}
        clearable={context !== "card"}
        onTimeChange={(t) => onPropertyChange(property.id, t)}
      />
    )
  }

  if (time == null) {
    return <Badge variant="elevation-muted">—</Badge>
  }
  return <Badge variant={variant}>{formatTime12h(time)}</Badge>
}
