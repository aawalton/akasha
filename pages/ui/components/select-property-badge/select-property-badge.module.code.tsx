"use client"

import { Badge } from "@akasha/design-badges/badge"
import { useBadgeLayoutContext } from "@akasha/design-badges/badge-layout-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@akasha/design-primitives/dropdown-menu"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import { resolveBadgeVariant } from "@akasha/pages-core/resolve-badge-variant"
import type { BadgeVariant } from "@akasha/pages-core/schema/color-rule-variant"
import { parseConfig } from "@akasha/pages-core/schema/pages"
import { selectConfigSchema } from "@akasha/pages-core/schema/property-config-schemas"
import type { SelectOption } from "@akasha/pages-core/schema/select-option-create"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"

function getOptions(definition: PropertyDefinition): readonly SelectOption[] {
  return parseConfig(selectConfigSchema, definition.config, { options: [] }).options
}

function findOption(options: readonly SelectOption[], id: string): SelectOption | undefined {
  return options.find((o) => o.id === id)
}

const DROPDOWN_TRIGGER_CLS =
  "inline-flex h-5 cursor-pointer items-center outline-none focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"

const DROPDOWN_ITEM_ACTIVE_CLS = `data-[highlighted]:!bg-surface-4 focus:!bg-surface-4 group-has-[[data-highlighted]]/select:[&:not([data-highlighted])]:!bg-transparent ${surfaceClass(4)}`
const DROPDOWN_ITEM_INACTIVE_CLS = "data-[highlighted]:!bg-surface-4 focus:!bg-surface-4"

function SelectDropdown({
  definition,
  currentValue,
  trigger,
  onPropertyChange,
  align,
}: {
  definition: PropertyDefinition
  currentValue: PropertyValue
  trigger: React.ReactNode
  onPropertyChange: NonNullable<PropertyBadgeProps["onPropertyChange"]>
  align: "start" | "end"
}) {
  const options = getOptions(definition)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span role="button" tabIndex={0} className={DROPDOWN_TRIGGER_CLS}>
          {trigger}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className="group/select"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {options.map((opt) => {
          const isActive = opt.id === currentValue
          const optVariant = resolveBadgeVariant(definition, opt.id) ?? "elevation-muted"
          return (
            <DropdownMenuItem
              key={opt.id}
              className={isActive ? DROPDOWN_ITEM_ACTIVE_CLS : DROPDOWN_ITEM_INACTIVE_CLS}
              onClick={(e) => {
                e.stopPropagation()
                onPropertyChange(definition.id, opt.id, e.timeStamp)
              }}
            >
              <Badge variant={optVariant}>{opt.label}</Badge>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function SelectPropertyBadge({
  property,
  value,
  editable,
  onPropertyChange,
}: PropertyBadgeProps) {
  const layout = useBadgeLayoutContext()
  const align = layout.popoverAlign ?? "start"
  const options = getOptions(property)
  const option = typeof value === "string" ? findOption(options, value) : undefined
  const accentVariant = property.accent ? "accent" : "elevation-muted"
  const variantForValue = (v: PropertyValue): BadgeVariant =>
    resolveBadgeVariant(property, v) ?? accentVariant

  const trigger = option ? (
    <Badge variant={variantForValue(value)}>{option.label}</Badge>
  ) : (
    <Badge variant="elevation-muted">
      <span className="text-tertiary">Empty</span>
    </Badge>
  )

  if (!editable || !onPropertyChange) {
    return trigger
  }

  return (
    <SelectDropdown
      definition={property}
      currentValue={value}
      trigger={trigger}
      onPropertyChange={onPropertyChange}
      align={align}
    />
  )
}
