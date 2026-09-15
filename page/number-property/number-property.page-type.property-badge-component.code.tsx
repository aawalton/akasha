"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { NumberBadge } from "akasha/design/interface/badge/modules/number-badge/number-badge.module.code.tsx"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { resolveBadgeVariant } from "akasha/page/core/modules/resolve-badge-variant/resolve-badge-variant.module.code.ts"
import {
  formatPropertyNumber,
  toNumber,
} from "akasha/page/core/property-type/modules/number/number.module.code.ts"
import type { BadgeVariant } from "akasha/page/core/schema/modules/color-rule-variant/color-rule-variant.module.code.ts"
import { parseConfig } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import {
  type NumberConfig,
  numberConfigSchema,
} from "akasha/page/core/schema/modules/property-config-schemas/property-config-schemas.module.code.ts"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"

function configOf(definition: PropertyDefinition): NumberConfig {
  return parseConfig(numberConfigSchema, definition.config, { format: "number" })
}

function shownAs(held: number, config: NumberConfig): string {
  const body = formatPropertyNumber(held, config)
  const ahead = config.prefix != null ? `${config.prefix}${body}` : body
  return config.units != null ? `${ahead} ${config.units}` : ahead
}

export function Drawing({ property, value, editable, onPropertyChange }: PropertyBadgeProps) {
  const config = configOf(property)
  const accented: BadgeVariant = property.accent ? "accent" : "elevation-muted"
  const held = toNumber(value)
  const variant = resolveBadgeVariant(property, held) ?? config.badgeVariant ?? accented

  if (editable && onPropertyChange) {
    return (
      <NumberBadge
        editable
        value={held ?? 0}
        min={config.min}
        max={config.max}
        prefix={config.prefix ?? ""}
        format={(one) => shownAs(one, config)}
        variant={variant}
        onChange={(next) => onPropertyChange(property.id, next)}
      />
    )
  }

  if (held === null) {
    return <Badge variant="elevation-muted">—</Badge>
  }
  return (
    <Badge variant={variant}>
      <span className="tabular-nums">{shownAs(held, config)}</span>
    </Badge>
  )
}
