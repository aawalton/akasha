"use client"

import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import { resolveBadgeVariant } from "@akasha/pages-core/resolve-badge-variant"
import type { BadgeVariant } from "@akasha/pages-core/schema/color-rule-variant"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"
import { Badge } from "akasha/design/badges/badge/badge.module.code.tsx"
import { TimeBadge } from "akasha/design/badges/time-badge/time-badge.module.code.tsx"
import { formatTime12h } from "akasha/design/forms/format-time/format-time.module.code.ts"

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
  onPropertyChange,
}: PropertyBadgeProps) {
  const accentVariant: BadgeVariant = property.accent ? "accent" : "elevation-muted"
  const variant = resolveBadgeVariant(property, value) ?? accentVariant
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
