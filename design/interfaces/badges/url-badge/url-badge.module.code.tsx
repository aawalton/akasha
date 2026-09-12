"use client"

import {
  Badge,
  type BadgeVariant,
} from "akasha/design/interfaces/badges/modules/badge/badge.module.code.tsx"
import { ExternalLink } from "lucide-react"

interface UrlBadgeProps {
  value: string
  variant?: BadgeVariant
  className?: string
}

function UrlBadge({ value, variant = "elevation-muted", className }: UrlBadgeProps) {
  if (value === "") {
    return (
      <Badge variant={variant} className={className}>
        —
      </Badge>
    )
  }
  const hostname = hostIn(value)
  return (
    <Badge variant={variant} className={className}>
      {hostname != null ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-accent hover:underline"
        >
          <span>{hostname}</span>
          <ExternalLink className="size-3 shrink-0" />
        </a>
      ) : (
        value
      )}
    </Badge>
  )
}

function hostIn(value: string): string | null {
  try {
    return new URL(value).hostname
  } catch {
    return null
  }
}

export type { UrlBadgeProps }
export { hostIn, UrlBadge }
