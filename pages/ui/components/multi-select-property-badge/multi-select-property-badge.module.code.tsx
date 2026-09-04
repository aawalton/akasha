"use client"

import { Badge } from "@akasha/design-badges/badge"
import { useBadgeLayoutContext } from "@akasha/design-badges/badge-layout-context"
import { resolveBadgeVariant } from "@akasha/pages-core/color-rules"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import { parseConfig } from "@akasha/pages-core/schema/pages"
import { multiSelectConfigSchema } from "@akasha/pages-core/schema/property-config-schemas"
import type { SelectOption } from "@akasha/pages-core/schema/select-option-create"
import type { PageDataJSON, PropertyDefinition } from "@akasha/pages-core/types"
import { MultiSelectPopover } from "@akasha/pages-ui-components/multi-select-popover"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"
import { requireGet } from "@akasha/utils-narrow/require-get"

function getOptions(definition: PropertyDefinition): readonly SelectOption[] {
  return parseConfig(multiSelectConfigSchema, definition.config, { options: [] }).options
}

function getValueArray(value: PropertyValue): readonly string[] {
  if (!Array.isArray(value)) return []
  return value.filter((v): v is string => typeof v === "string")
}

function resolveOptionVariant(
  definition: PropertyDefinition,
  pageData: PageDataJSON | undefined,
  optId: string
): ReturnType<typeof resolveBadgeVariant> {
  return resolveBadgeVariant(definition, pageData ?? {}, optId)
}

export function MultiSelectPropertyBadge({
  property,
  value,
  editable,
  pageData,
  onPropertyChange,
  onCreateOption,
}: PropertyBadgeProps) {
  const layout = useBadgeLayoutContext()
  const align = layout.popoverAlign ?? "start"
  const options = getOptions(property)
  const optionMap = new Map(options.map((o) => [o.id, o]))
  const ids = getValueArray(value).filter((id) => optionMap.has(id))
  const accentVariant = property.accent ? "accent" : "elevation-muted"
  const variantFor = (id: string) => resolveOptionVariant(property, pageData, id) ?? accentVariant

  if (!editable || !onPropertyChange) {
    if (ids.length === 0) return null
    return (
      <>
        {ids.map((id) => {
          const opt = requireGet(optionMap, id)
          return (
            <Badge key={`${property.id}-${id}`} variant={variantFor(id)}>
              {opt.label}
            </Badge>
          )
        })}
      </>
    )
  }

  const trigger =
    ids.length === 0 ? (
      <Badge variant="elevation-muted">
        <span className="text-tertiary">Empty</span>
      </Badge>
    ) : (
      ids.map((id) => {
        const opt = requireGet(optionMap, id)
        return (
          <Badge key={`${property.id}-${id}`} variant={variantFor(id)}>
            {opt.label}
          </Badge>
        )
      })
    )

  return (
    <MultiSelectPopover
      currentIds={ids}
      options={options}
      onAdd={(id, eventTimeStamp) => onPropertyChange(property.id, [...ids, id], eventTimeStamp)}
      onRemove={(id, eventTimeStamp) =>
        onPropertyChange(
          property.id,
          ids.filter((x) => x !== id),
          eventTimeStamp
        )
      }
      onCreate={onCreateOption ? (label) => onCreateOption(property.id, label) : undefined}
      align={align}
      getVariant={(id) => resolveOptionVariant(property, pageData, id) ?? undefined}
    >
      {trigger}
    </MultiSelectPopover>
  )
}
