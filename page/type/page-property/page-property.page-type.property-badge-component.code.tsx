"use client"

import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { scalarText } from "akasha/code/type/narrowing/modules/scalar-text/scalar-text.module.code.ts"
import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  stackedBadgesClass,
  useBadgeLayoutContext,
} from "akasha/design/interface/badge/modules/badge-layout-context/badge-layout-context.module.code.tsx"
import { InputBadge } from "akasha/design/interface/badge/modules/input-badge/input-badge.module.code.tsx"
import { resolveBadgeVariant } from "akasha/page/core/modules/resolve-badge-variant/resolve-badge-variant.module.code.ts"
import { parseConfig } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import { textConfigSchema } from "akasha/page/core/schema/modules/property-config-schemas/property-config-schemas.module.code.ts"
import { keyOf } from "akasha/page/ui/component/modules/badge-keying/badge-keying.module.code.ts"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"
import { resolveRelationName } from "akasha/page/ui/component/modules/relation-display/relation-display.module.code.ts"
import {
  type PageResolverValue,
  usePageResolverOptional,
} from "akasha/page/ui/context/modules/page-resolver-context/page-resolver-context.module.code.tsx"
import { useEffect, useState } from "react"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

function HeldWhileTyped({
  value,
  onCommit,
  variant,
}: {
  value: string
  onCommit: (next: string) => void
  variant?: React.ComponentProps<typeof InputBadge>["variant"]
}) {
  const [draft, setDraft] = useState(value)
  useEffect(() => {
    setDraft(value)
  }, [value])
  return (
    <InputBadge
      value={draft}
      variant={variant}
      onChange={(one) => setDraft(one)}
      onCommit={(one) => {
        if (one !== value) onCommit(one)
      }}
      placeholder="Enter text..."
    />
  )
}

const RELATION = "relation"

function shownOf(
  one: unknown,
  property: PropertyBadgeProps["property"],
  resolver: PageResolverValue | null
): string {
  const said = scalarText(one)
  if (said !== null) return said
  const sole = property.fields?.length === 1 ? property.fields[0] : undefined
  if (sole === undefined || !isRecord(one)) return ""
  const field = scalarText(one[sole.id]) ?? ""
  return sole.type === RELATION && field !== "" ? resolveRelationName(resolver, field) : field
}

export function Drawing({ property, value, editable, onPropertyChange }: PropertyBadgeProps) {
  const layout = useBadgeLayoutContext()
  const resolver = usePageResolverOptional()
  const config = parseConfig(textConfigSchema, property.config, {})
  const otherwise = config.badgeVariant ?? (property.accent ? "accent" : "elevation-muted")
  const variantFor = (shown: string) => resolveBadgeVariant(property, shown) ?? otherwise

  if (Array.isArray(value) && value.length !== 0) {
    return (
      <span className={stackedBadgesClass(layout.popoverAlign ?? "end")}>
        {value.map((one, at) => {
          const item = shownOf(one, property, resolver)
          return (
            <Badge
              key={keyOf(one, at)}
              variant={variantFor(item)}
              className="whitespace-normal text-left"
            >
              {item}
            </Badge>
          )
        })}
      </span>
    )
  }

  const said = scalarText(value) ?? ""
  if (editable && onPropertyChange) {
    return (
      <HeldWhileTyped
        value={said}
        variant={variantFor(said)}
        onCommit={(one) => onPropertyChange(property.id, one)}
      />
    )
  }
  return <Badge variant={variantFor(said)}>{said}</Badge>
}
