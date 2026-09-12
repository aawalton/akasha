"use client"

import { Badge } from "akasha/design/interfaces/badges/modules/badge/badge.module.code.tsx"
import { useBadgeLayoutContext } from "akasha/design/interfaces/badges/modules/badge-layout-context/badge-layout-context.module.code.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "akasha/design/interfaces/primitives/dropdown-menu/dropdown-menu.module.code.tsx"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import type { PropertyDefinition } from "akasha/pages/core/page-data/page-data.module.code.ts"
import type { PropertyValue } from "akasha/pages/core/property-types/property-type-ops/property-type-ops.module.code.ts"
import {
  findOption,
  getOptions,
} from "akasha/pages/core/property-types/select/select.module.code.ts"
import { resolveBadgeVariant } from "akasha/pages/core/resolve-badge-variant/resolve-badge-variant.module.code.ts"
import type { BadgeVariant } from "akasha/pages/core/schema/modules/color-rule-variant/color-rule-variant.module.code.ts"
import type { PropertyBadgeProps } from "akasha/pages/ui/components/property-badge/property-badge.module.code.tsx"

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
