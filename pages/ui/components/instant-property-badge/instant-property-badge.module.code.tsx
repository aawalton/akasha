"use client"

import { Badge } from "@akasha/design-badges/badge"
import { formatRelativeTime } from "@akasha/design-primitives/format-relative-time"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { resolveBadgeVariant } from "@akasha/pages-core/color-rules"
import { formatAbsoluteInstant } from "@akasha/pages-core/property-types/instant"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import type { BadgeVariant } from "@akasha/pages-core/schema/color-rule"
import { parseConfig } from "@akasha/pages-core/schema/pages"
import {
  type InstantConfig,
  type InstantFormat,
  instantConfigSchema,
} from "@akasha/pages-core/schema/property-config-schemas"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"
import { useState } from "react"

function getInstantFormat(definition: PropertyDefinition): InstantFormat {
  const config: InstantConfig = parseConfig(instantConfigSchema, definition.config, {
    format: "relative",
  })
  return config.format
}

function formatInstantLabel(ms: number, format: InstantFormat): string {
  if (format === "relative") return formatRelativeTime(ms) ?? "—"
  return formatAbsoluteInstant(ms, format)
}

function toMillis(value: PropertyValue): number | null {
  if (value == null || value === "") return null
  if (typeof value === "number") return Number.isFinite(value) ? value : null
  if (typeof value === "string") {
    const ms = new Date(value).getTime()
    return Number.isFinite(ms) ? ms : null
  }
  return null
}

function toDateTimeLocal(ms: number): string {
  return new Date(ms).toISOString().slice(0, 16)
}

function InstantPopoverBadge({
  value,
  onIsoChange,
  variant = "elevation-muted",
  format,
}: {
  value: PropertyValue
  onIsoChange: (iso: string | null) => void
  variant?: BadgeVariant
  format: InstantFormat
}) {
  const [open, setOpen] = useState(false)
  const ms = toMillis(value)
  const dateTimeStr = ms != null ? toDateTimeLocal(ms) : ""
  const label = ms != null ? formatInstantLabel(ms, format) : "Pick time"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          className="inline-flex h-5 cursor-pointer items-center outline-none focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
        >
          <Badge variant={variant}>{label}</Badge>
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-3" onPointerDown={(e) => e.stopPropagation()}>
        <input
          type="datetime-local"
          value={dateTimeStr}
          onChange={(e) => {
            const v = e.target.value
            onIsoChange(v !== "" ? new Date(v).toISOString() : null)
          }}
          className="rounded-md border border-outline bg-surface px-2 py-0.5 text-sm"
        />
      </PopoverContent>
    </Popover>
  )
}

export function InstantPropertyBadge({
  property,
  value,
  editable,
  pageData,
  onPropertyChange,
}: PropertyBadgeProps) {
  const accentVariant: BadgeVariant = property.accent ? "accent" : "elevation-muted"
  const variant = resolveBadgeVariant(property, pageData ?? {}, value) ?? accentVariant
  const format = getInstantFormat(property)

  if (editable && onPropertyChange) {
    return (
      <InstantPopoverBadge
        value={value}
        variant={variant}
        format={format}
        onIsoChange={(iso) => onPropertyChange(property.id, iso)}
      />
    )
  }

  const ms = toMillis(value)
  if (ms == null) {
    return (
      <Badge variant="elevation-muted">
        <span className="text-tertiary">—</span>
      </Badge>
    )
  }
  return <Badge variant={variant}>{formatInstantLabel(ms, format)}</Badge>
}
