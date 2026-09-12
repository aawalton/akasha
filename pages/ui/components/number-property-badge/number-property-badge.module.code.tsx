"use client"

import { Badge } from "akasha/design/interfaces/badges/modules/badge/badge.module.code.tsx"
import { NumberBadge } from "akasha/design/interfaces/badges/number-badge/number-badge.module.code.tsx"
import type { PropertyDefinition } from "akasha/pages/core/page-data/page-data.module.code.ts"
import {
  formatPropertyNumber,
  toNumber,
} from "akasha/pages/core/property-types/number/number.module.code.ts"
import { resolveBadgeVariant } from "akasha/pages/core/resolve-badge-variant/resolve-badge-variant.module.code.ts"
import type { BadgeVariant } from "akasha/pages/core/schema/color-rule-variant/color-rule-variant.module.code.ts"
import { parseConfig } from "akasha/pages/core/schema/pages/pages.module.code.ts"
import {
  type NumberConfig,
  numberConfigSchema,
} from "akasha/pages/core/schema/property-config-schemas/property-config-schemas.module.code.ts"
import type { PropertyBadgeProps } from "akasha/pages/ui/components/property-badge/property-badge.module.code.tsx"

function getConfig(definition: PropertyDefinition): NumberConfig {
  return parseConfig(numberConfigSchema, definition.config, { format: "number" })
}

function formatBadge(n: number, config: NumberConfig): string {
  const body = formatPropertyNumber(n, config)
  const withPrefix = config.prefix != null ? `${config.prefix}${body}` : body
  return config.units != null ? `${withPrefix} ${config.units}` : withPrefix
}

export function NumberPropertyBadge({
  property,
  value,
  editable,
  onPropertyChange,
}: PropertyBadgeProps) {
  const config = getConfig(property)
  const accentVariant: BadgeVariant = property.accent ? "accent" : "elevation-muted"
  const n = toNumber(value)
  const variant = resolveBadgeVariant(property, n) ?? config.badgeVariant ?? accentVariant

  if (editable && onPropertyChange) {
    return (
      <NumberBadge
        editable
        value={n ?? 0}
        min={config.min}
        max={config.max}
        prefix={config.prefix ?? ""}
        format={(num) => formatBadge(num, config)}
        variant={variant}
        onChange={(next) => onPropertyChange(property.id, next)}
      />
    )
  }

  if (n === null) {
    return <Badge variant="elevation-muted">—</Badge>
  }
  return (
    <Badge variant={variant}>
      <span className="tabular-nums">{formatBadge(n, config)}</span>
    </Badge>
  )
}
