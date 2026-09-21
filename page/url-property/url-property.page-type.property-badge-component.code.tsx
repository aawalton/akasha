"use client"

import { scalarText } from "akasha/code/type/narrowing/modules/scalar-text/scalar-text.module.code.ts"
import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { InputBadge } from "akasha/design/interface/badge/modules/input-badge/input-badge.module.code.tsx"
import { hostIn } from "akasha/design/interface/badge/modules/url-badge/url-badge.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"
import { ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

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

export function Drawing({
  property,
  value,
  context,
  editable,
  onPropertyChange,
}: PropertyBadgeProps) {
  const str = scalarText(value) ?? ""
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
  const hostname = hostIn(str)
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
