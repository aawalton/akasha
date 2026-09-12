"use client"

import { Badge } from "akasha/design/interfaces/badges/modules/badge/badge.module.code.tsx"
import { ButtonBadge } from "akasha/design/interfaces/badges/modules/button-badge/button-badge.module.code.tsx"
import type { PropertyValue } from "akasha/pages/core/property-types/property-type-ops/property-type-ops.module.code.ts"
import { richDocumentSchema } from "akasha/pages/core/property-types/rich-document/rich-document.module.code.ts"
import type { PropertyBadgeProps } from "akasha/pages/ui/components/property-badge/property-badge.module.code.tsx"

function blockCount(value: PropertyValue): number {
  const parsed = richDocumentSchema.safeParse(value)
  return parsed.success ? parsed.data.blocks.length : 0
}

export function RichDocumentPropertyBadge({
  property,
  value,
  context,
  onCardNavigate,
}: PropertyBadgeProps) {
  const n = blockCount(value)
  const variant = property.accent ? "accent" : "elevation-muted"

  if (context === "card") {
    const label = `${property.title}: ${n} ${n === 1 ? "block" : "blocks"}`
    if (onCardNavigate) {
      return (
        <ButtonBadge
          variant={variant}
          onClick={(e) => {
            e.stopPropagation()
            onCardNavigate()
          }}
        >
          {label}
        </ButtonBadge>
      )
    }
    return <Badge variant={variant}>{label}</Badge>
  }

  return <Badge variant={variant}>{`${n} ${n === 1 ? "block" : "blocks"}`}</Badge>
}
