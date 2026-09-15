"use client"

import { Badge } from "akasha/design/interfaces/design-interface-badge/modules/badge/badge.module.code.tsx"
import { InputBadge } from "akasha/design/interfaces/design-interface-badge/modules/input-badge/input-badge.module.code.tsx"
import { resolveBadgeVariant } from "akasha/page/core/modules/resolve-badge-variant/resolve-badge-variant.module.code.ts"
import { parseConfig } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import { textConfigSchema } from "akasha/page/core/schema/modules/property-config-schemas/property-config-schemas.module.code.ts"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"
import { scalarText } from "akasha/util/narrow/modules/scalar-text/scalar-text.module.code.ts"
import { useEffect, useState } from "react"

function HeldWhileTyped({
  value,
  onCommit,
  variant,
}: {
  value: string
  onCommit: (next: string) => void
  variant?: React.ComponentProps<typeof InputBadge>["variant"]
}) {
  const [draft, setDraft] = useState(value)
  useEffect(() => {
    setDraft(value)
  }, [value])
  return (
    <InputBadge
      value={draft}
      variant={variant}
      onChange={(one) => setDraft(one)}
      onCommit={(one) => {
        if (one !== value) onCommit(one)
      }}
      placeholder="Enter text..."
    />
  )
}

export function Drawing({ property, value, editable, onPropertyChange }: PropertyBadgeProps) {
  const said = scalarText(value) ?? ""
  const config = parseConfig(textConfigSchema, property.config, {})
  const variant =
    resolveBadgeVariant(property, said) ??
    config.badgeVariant ??
    (property.accent ? "accent" : "elevation-muted")

  if (editable && onPropertyChange) {
    return (
      <HeldWhileTyped
        value={said}
        variant={variant}
        onCommit={(one) => onPropertyChange(property.id, one)}
      />
    )
  }
  return <Badge variant={variant}>{said}</Badge>
}
