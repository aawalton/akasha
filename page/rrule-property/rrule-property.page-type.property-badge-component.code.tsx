"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { resolveBadgeVariant } from "akasha/page/core/modules/resolve-badge-variant/resolve-badge-variant.module.code.ts"
import { isRruleValue } from "akasha/page/core/property-type/modules/rrule/rrule.module.code.ts"
import { rruleWording } from "akasha/page/core/property-type/modules/rrule-wording/rrule-wording.module.code.ts"
import type { BadgeVariant } from "akasha/page/core/schema/modules/color-rule-variant/color-rule-variant.module.code.ts"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"

export function Drawing({ property, value }: PropertyBadgeProps) {
  if (!isRruleValue(value)) return <Badge variant="elevation-muted">—</Badge>
  const accentVariant: BadgeVariant = property.accent ? "accent" : "elevation-muted"
  const variant = resolveBadgeVariant(property, value) ?? accentVariant
  return <Badge variant={variant}>{rruleWording(value)}</Badge>
}
