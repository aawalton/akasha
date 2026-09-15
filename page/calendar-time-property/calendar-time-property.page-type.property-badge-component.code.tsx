"use client"

import { Badge } from "akasha/design/interfaces/design-interface-badge/modules/badge/badge.module.code.tsx"
import { TimeBadge } from "akasha/design/interfaces/design-interface-badge/modules/time-badge/time-badge.module.code.tsx"
import { formatTime12h } from "akasha/design/interfaces/design-interface-form/modules/format-time/format-time.module.code.ts"
import { resolveBadgeVariant } from "akasha/page/core/modules/resolve-badge-variant/resolve-badge-variant.module.code.ts"
import type { PropertyValue } from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import type { BadgeVariant } from "akasha/page/core/schema/modules/color-rule-variant/color-rule-variant.module.code.ts"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/

function asTimeString(value: PropertyValue): string | null {
  if (typeof value !== "string" || !TIME_REGEX.test(value)) return null
  return value
}

export function Drawing({
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
