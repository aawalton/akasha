"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { ButtonBadge } from "@shared/design-badges/components/button-badge"
import { richDocumentSchema } from "@shared/pages-core/property-types/rich-document"

import type { PropertyBadgeProps } from "./property-badge"
import type { PropertyValue } from "./types"

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
