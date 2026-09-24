"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"
import { ExternalLink } from "lucide-react"

const FILE_AT = "/api/page-file"

const SLUG = "slug"

function fileHref(pageTypeSlug: string | undefined, slug: unknown, key: string): string | null {
  if (pageTypeSlug === undefined || pageTypeSlug === "") return null
  if (typeof slug !== "string" || slug === "") return null
  const parts = [pageTypeSlug, slug, key].map(encodeURIComponent)
  return `${FILE_AT}/${parts.join("/")}`
}

export function Drawing({ property, pageData, pageTypeSlug }: PropertyBadgeProps) {
  const variant = property.accent ? "accent" : "elevation-muted"
  const href = fileHref(pageTypeSlug, pageData?.[SLUG], property.id)
  if (href === null) return <Badge variant={variant}>{property.title}</Badge>
  return (
    <Badge variant={variant}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 text-accent hover:underline"
      >
        <span>{property.title}</span>
        <ExternalLink className="size-3 shrink-0" />
      </a>
    </Badge>
  )
}
