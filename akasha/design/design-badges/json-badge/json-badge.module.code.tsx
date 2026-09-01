"use client"

import { Badge, type BadgeVariant } from "../badge/badge.module.code.tsx"

interface JsonBadgeProps {
  value: unknown
  label?: string
  variant?: BadgeVariant
  className?: string
}

function JsonBadge({ value, label, variant = "elevation-muted", className }: JsonBadgeProps) {
  const chars = JSON.stringify(value ?? null).length
  const text = label != null ? `${label}: ${chars} chars` : `${chars} chars`
  return (
    <Badge variant={variant} className={className}>
      {text}
    </Badge>
  )
}

export type { JsonBadgeProps }
export { JsonBadge }
