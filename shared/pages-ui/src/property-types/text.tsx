"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { InputBadge } from "@shared/design-badges/components/input-badge"
import { resolveBadgeVariant } from "@shared/pages-core/color-rules"
import { useEffect, useState } from "react"

import { parseConfig } from "@shared/pages-core/schema/pages"
import { textConfigSchema } from "@shared/pages-core/schema/property-config-schemas"
import type { PropertyBadgeProps } from "./property-badge"
import type { PropertyValue } from "./types"

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
