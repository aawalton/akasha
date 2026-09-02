"use client"

import { Badge } from "@akasha/design-badges/badge"
import { NumberBadge } from "@akasha/design-badges/number-badge"
import { resolveBadgeVariant } from "@akasha/pages-core/color-rules"
import { formatPropertyNumber, toNumber } from "@akasha/pages-core/property-types/number"
import type { BadgeVariant } from "@akasha/pages-core/schema/color-rule"
import { parseConfig } from "@akasha/pages-core/schema/pages"
import {
  type NumberConfig,
  numberConfigSchema,
} from "@akasha/pages-core/schema/property-config-schemas"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"

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
  pageData,
  onPropertyChange,
}: PropertyBadgeProps) {
  const config = getConfig(property)
  const accentVariant: BadgeVariant = property.accent ? "accent" : "elevation-muted"
  const n = toNumber(value)
  const variant =
    resolveBadgeVariant(property, pageData ?? {}, n) ?? config.badgeVariant ?? accentVariant

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
