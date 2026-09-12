"use client"

import {
  Badge,
  type BadgeVariant,
} from "akasha/design/interfaces/badges/modules/badge/badge.module.code.tsx"
import { formatRelativeTime } from "akasha/design/interfaces/primitives/format-relative-time/format-relative-time.module.code.ts"

interface InstantBadgeProps {
  value: number | null | undefined
  variant?: BadgeVariant
  className?: string
}

function InstantBadge({ value, variant = "elevation-muted", className }: InstantBadgeProps) {
  const formatted = value == null || !Number.isFinite(value) ? null : formatRelativeTime(value)

  return (
    <Badge variant={variant} className={className}>
      {formatted ?? "—"}
    </Badge>
  )
}

export type { InstantBadgeProps }
export { InstantBadge }
