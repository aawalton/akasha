"use client"

import { Badge } from "../badge/badge.module.code.tsx"

interface EmptyBadgeProps {
  className?: string
}

function EmptyBadge({ className }: EmptyBadgeProps) {
  return (
    <Badge variant="elevation-muted" className={className}>
      Empty
    </Badge>
  )
}

export type { EmptyBadgeProps }
export { EmptyBadge }
