"use client"

import { InputBadge } from "akasha/design/interfaces/badges/input-badge/input-badge.module.code.tsx"
import { Badge } from "akasha/design/interfaces/badges/modules/badge/badge.module.code.tsx"
import { resolveBadgeVariant } from "akasha/pages/core/resolve-badge-variant/resolve-badge-variant.module.code.ts"
import { parseConfig } from "akasha/pages/core/schema/pages/pages.module.code.ts"
import { textConfigSchema } from "akasha/pages/core/schema/property-config-schemas/property-config-schemas.module.code.ts"
import type { PropertyBadgeProps } from "akasha/pages/ui/components/property-badge/property-badge.module.code.tsx"
import { scalarText } from "akasha/utils/narrow/scalar-text/scalar-text.module.code.ts"
import { useEffect, useState } from "react"

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
  onPropertyChange,
}: PropertyBadgeProps) {
  const str = scalarText(value) ?? ""
  const config = parseConfig(textConfigSchema, property.config, {})
  const variant =
    resolveBadgeVariant(property, str) ??
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
