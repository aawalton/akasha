"use client"

import { Badge } from "@akasha/design-badges/badge"
import { InputBadge } from "@akasha/design-badges/input-badge"
import { resolveBadgeVariant } from "@akasha/pages-core/color-rules"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"

import { parseConfig } from "@akasha/pages-core/schema/pages"
import { textConfigSchema } from "@akasha/pages-core/schema/property-config-schemas"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"
import { useEffect, useState } from "react"

function asText(value: PropertyValue): string {
  if (value == null || typeof value === "object") return ""
  return String(value)
}

function CommitOnlyInputBadge({
  value,
  onCommit,
  placeholder,
  variant,
  className,
}: {
  value: string
  onCommit: (next: string) => void
  placeholder?: string
  variant?: React.ComponentProps<typeof InputBadge>["variant"]
  className?: string
}) {
  const [draft, setDraft] = useState(value)
  useEffect(() => {
    setDraft(value)
  }, [value])
  return (
    <InputBadge
      value={draft}
      variant={variant}
      onChange={(v) => setDraft(v)}
      onCommit={(v) => {
        if (v !== value) onCommit(v)
      }}
      placeholder={placeholder}
      className={className}
    />
  )
}

export function TextPropertyBadge({
  property,
  value,
  editable,
  pageData,
  onPropertyChange,
}: PropertyBadgeProps) {
  const str = asText(value)
  const config = parseConfig(textConfigSchema, property.config, {})
  const variant =
    resolveBadgeVariant(property, pageData ?? {}, str) ??
    config.badgeVariant ??
    (property.accent ? "accent" : "elevation-muted")

  if (editable && onPropertyChange) {
    return (
      <CommitOnlyInputBadge
        value={str}
        variant={variant}
        onCommit={(v) => onPropertyChange(property.id, v)}
        placeholder="Enter text..."
      />
    )
  }
  return <Badge variant={variant}>{str}</Badge>
}
