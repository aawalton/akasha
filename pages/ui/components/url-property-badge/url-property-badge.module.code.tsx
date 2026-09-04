"use client"

import { Badge } from "@akasha/design-badges/badge"
import { InputBadge } from "@akasha/design-badges/input-badge"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"
import { ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"

function asUrl(value: PropertyValue): string {
  if (value == null || typeof value === "object") return ""
  return String(value)
}

function tryHostname(value: string): string | null {
  try {
    return new URL(value).hostname
  } catch {
    return null
  }
}

function CommitOnlyUrlBadge({
  value,
  onCommit,
  variant,
  className,
}: {
  value: string
  onCommit: (next: string) => void
  variant?: React.ComponentProps<typeof InputBadge>["variant"]
  className?: string
}) {
  const [draft, setDraft] = useState(value)
  useEffect(() => {
    setDraft(value)
  }, [value])
  return (
    <InputBadge
      value={draft}
      variant={variant}
      onChange={(v) => setDraft(v)}
      onCommit={(v) => {
        if (v !== value) onCommit(v)
      }}
      placeholder="Enter URL..."
      className={className}
    />
  )
}

export function UrlPropertyBadge({
  property,
  value,
  context,
  editable,
  onPropertyChange,
}: PropertyBadgeProps) {
  const str = asUrl(value)
  const variant = property.accent ? "accent" : "elevation-muted"

  if (editable && onPropertyChange && context !== "card") {
    return (
      <span className="inline-flex items-center gap-1">
        <CommitOnlyUrlBadge
          value={str}
          variant={variant}
          onCommit={(v) => onPropertyChange(property.id, v)}
        />
        {str !== "" ? (
          <a
            href={str}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-accent hover:underline"
            aria-label="Open link in new tab"
          >
            <ExternalLink className="size-3 shrink-0" />
          </a>
        ) : null}
      </span>
    )
  }

  if (str === "") {
    return (
      <Badge variant="elevation-muted">
        <span className="text-tertiary">—</span>
      </Badge>
    )
  }
  const hostname = tryHostname(str)
  return (
    <Badge variant={variant}>
      <span className="inline-flex items-center gap-1">
        {hostname != null ? (
          <a
            href={str}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-accent hover:underline"
          >
            <span>{hostname}</span>
            <ExternalLink className="size-3 shrink-0" />
          </a>
        ) : (
          str
        )}
      </span>
    </Badge>
  )
}
