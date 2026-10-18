"use client"

import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PropertyValue } from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import { keyOf } from "akasha/page/ui/component/modules/badge-keying/badge-keying.module.code.ts"
import { JsonPropertyBadge } from "akasha/page/ui/component/modules/json-property-badge/json-property-badge.module.code.tsx"
import {
  isEmptyValue,
  PropertyBadge,
  type PropertyBadgeProps,
} from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"

const DRAWS_A_LIST: ReadonlySet<string> = new Set(["multi-relation", "multi-select"])

function entriesIn(value: PropertyValue): readonly Record<string, unknown>[] {
  return (Array.isArray(value) ? value : [value]).filter(isRecord)
}

function heldIn(field: PropertyDefinition, held: PropertyValue): readonly PropertyValue[] {
  if (!Array.isArray(held) || DRAWS_A_LIST.has(field.type)) return [held]
  return held
}

interface LinkHeld {
  readonly field: PropertyDefinition
  readonly at: number
  readonly value: PropertyValue
}

function linksIn(
  fields: readonly PropertyDefinition[],
  entries: readonly Record<string, unknown>[]
): readonly LinkHeld[] {
  const links = fields.filter((field) => field.type === "url")
  return entries.flatMap((entry, at) =>
    links
      .map((field) => ({ field, at, value: (entry[field.id] ?? null) as PropertyValue }))
      .filter((one) => !isEmptyValue(one.field.type, one.value))
  )
}

function LinksHeld({ held }: { held: readonly LinkHeld[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {held.map((one) => (
        <PropertyBadge
          context="card"
          editable={false}
          key={`${one.at}-${one.field.id}`}
          property={one.field}
          value={one.value}
        />
      ))}
    </div>
  )
}

export function RecordPropertyBadge(props: PropertyBadgeProps) {
  const fields = props.property.fields ?? []
  const entries = entriesIn(props.value)
  if (fields.length === 0 || entries.length === 0) return <JsonPropertyBadge {...props} />
  if (props.context === "card") {
    const held = linksIn(fields, entries)
    return held.length === 0 ? <JsonPropertyBadge {...props} /> : <LinksHeld held={held} />
  }
  return (
    <div className="flex flex-col gap-3">
      {entries.map((entry, at) => (
        <div className="flex flex-col gap-1" key={keyOf(entry, at)}>
          {fields.map((field) => {
            const held = (entry[field.id] ?? null) as PropertyValue
            if (isEmptyValue(field.type, held)) return null
            return (
              <div className="flex items-baseline gap-2" key={field.id}>
                <span className="min-w-24 shrink-0 text-tertiary text-xs">{field.title}</span>
                <div className="flex flex-wrap gap-1">
                  {heldIn(field, held).map((one, each) => (
                    <PropertyBadge
                      context="detail"
                      editable={false}
                      key={keyOf(one, each)}
                      property={field}
                      value={one}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
