"use client"

import { formatRelativeTime } from "@akasha/design-primitives/format-relative-time"

import { Badge, type BadgeVariant } from "../badge/badge.module.code.tsx"

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
