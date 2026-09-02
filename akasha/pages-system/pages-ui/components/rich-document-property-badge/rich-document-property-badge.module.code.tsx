"use client"

import { Badge } from "@akasha/design-badges/badge"
import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { richDocumentSchema } from "@akasha/pages-core/property-types/rich-document"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"

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
