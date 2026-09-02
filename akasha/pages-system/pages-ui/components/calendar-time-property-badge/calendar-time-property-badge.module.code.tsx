"use client"

import { Badge } from "@akasha/design-badges/badge"
import { TimeBadge } from "@akasha/design-badges/time-badge"
import { formatTime12h } from "@akasha/design-forms/format-time"
import { resolveBadgeVariant } from "@akasha/pages-core/color-rules"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import type { BadgeVariant } from "@akasha/pages-core/schema/color-rule"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"

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
