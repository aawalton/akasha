"use client"

import { Badge } from "@akasha/design-badges/badge"
import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { Textarea } from "@akasha/design-primitives/textarea"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"
import { useState } from "react"
import { z } from "zod"

type JsonValue =
  | string
  | number
  | boolean
  | null
  | { readonly [k: string]: JsonValue }
  | readonly JsonValue[]
const JsonDraftSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(JsonDraftSchema),
    z.record(z.string(), JsonDraftSchema),
  ])
)

function readDefinitionName(definition: PropertyDefinition): string | undefined {
  if (typeof definition !== "object" || definition === null) return undefined
  const candidate: unknown = Reflect.get(definition, "name")
  return typeof candidate === "string" ? candidate : undefined
}

function JsonCardBadge({
  value,
  definition,
  onCardNavigate,
}: {
  value: PropertyValue
  definition: PropertyDefinition
  onCardNavigate?: () => void
}) {
  const name = readDefinitionName(definition) ?? definition.title
  const chars = JSON.stringify(value ?? null).length
  const label = `${name}: ${chars} chars`

  if (onCardNavigate) {
    return <ButtonBadge onClick={() => onCardNavigate()}>{label}</ButtonBadge>
  }
  return <Badge>{label}</Badge>
}

function JsonDetailField({
  value,
  definition,
  onPropertyChange,
}: {
  value: PropertyValue
  definition: PropertyDefinition
  onPropertyChange: (propertyId: string, value: PropertyValue) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(() => JSON.stringify(value, null, 2))
  const [hasError, setHasError] = useState(false)

  const enterEdit = () => {
    setDraft(JSON.stringify(value, null, 2))
    setHasError(false)
    setIsEditing(true)
  }

  const handleBlur = () => {
    try {
      const parsed: PropertyValue = JsonDraftSchema.parse(JSON.parse(draft))
      setHasError(false)
      setIsEditing(false)
      onPropertyChange(definition.id, parsed)
    } catch {
      setHasError(true)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <Textarea
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={handleBlur}
        className={hasError ? "border border-destructive" : undefined}
      />
    )
  }

  return (
    <div
      onClick={enterEdit}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          enterEdit()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Click to edit"
      className={hasError ? "border border-destructive" : undefined}
    >
      <pre className="cursor-text overflow-x-auto whitespace-pre-wrap text-xs">
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  )
}

export function JsonPropertyBadge({
  property,
  value,
  context,
  editable,
  onPropertyChange,
  onCardNavigate,
}: PropertyBadgeProps) {
  if (context === "card") {
    return <JsonCardBadge value={value} definition={property} onCardNavigate={onCardNavigate} />
  }

  if (editable && onPropertyChange) {
    return (
      <JsonDetailField value={value} definition={property} onPropertyChange={onPropertyChange} />
    )
  }
  if (value == null) return null
  if (typeof value === "string" && value.length === 0) return null
  return (
    <pre className="overflow-x-auto whitespace-pre-wrap text-xs">
      {typeof value === "string" ? value : JSON.stringify(value, null, 2)}
    </pre>
  )
}
