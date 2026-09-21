"use client"

import {
  Badge,
  type BadgeVariant,
} from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  stackedBadgesClass,
  useBadgeLayoutContext,
} from "akasha/design/interface/badge/modules/badge-layout-context/badge-layout-context.module.code.tsx"
import { badgeVariantForColor } from "akasha/design/interface/badge/modules/color-badge-variant/color-badge-variant.module.code.ts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "akasha/design/interface/primitive/modules/dropdown-menu/dropdown-menu.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { resolveBadgeVariant } from "akasha/page/core/modules/resolve-badge-variant/resolve-badge-variant.module.code.ts"
import { getValueArray } from "akasha/page/core/property-type/modules/multi-relation/multi-relation.module.code.ts"
import {
  findOption,
  getOptions,
} from "akasha/page/core/property-type/modules/select/select.module.code.ts"
import { parseConfig } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import { selectConfigSchema } from "akasha/page/core/schema/modules/property-config-schemas/property-config-schemas.module.code.ts"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"

const DROPDOWN_TRIGGER_CLS =
  "inline-flex h-5 cursor-pointer items-center outline-none focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"

const DROPDOWN_ITEM_ACTIVE_CLS = `data-[highlighted]:!bg-surface-4 focus:!bg-surface-4 group-has-[[data-highlighted]]/select:[&:not([data-highlighted])]:!bg-transparent ${surfaceClass(4)}`
const DROPDOWN_ITEM_INACTIVE_CLS = "data-[highlighted]:!bg-surface-4 focus:!bg-surface-4"

function colorNamedByOption(definition: PropertyDefinition): ReadonlyMap<string, string> {
  const named = new Map<string, string>()
  const config = parseConfig(selectConfigSchema, definition.config, { options: [] })
  for (const option of config.options) {
    if (option.color !== undefined) named.set(option.id, option.color)
  }
  return named
}

function optionBadgeVariant(
  definition: PropertyDefinition,
  colorNamed: ReadonlyMap<string, string>,
  optionId: string,
  fallback: BadgeVariant
): BadgeVariant {
  const named = badgeVariantForColor(colorNamed.get(optionId))
  if (named !== null) return named
  return resolveBadgeVariant(definition, optionId) ?? fallback
}

function SelectDropdown({
  definition,
  chosenIds,
  trigger,
  onPick,
  align,
}: {
  definition: PropertyDefinition
  chosenIds: readonly string[]
  trigger: React.ReactNode
  onPick: (optionId: string, eventTimeStamp: number) => void
  align: "start" | "end"
}) {
  const options = getOptions(definition)
  const colorNamed = colorNamedByOption(definition)
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
          const isActive = chosenIds.includes(opt.id)
          const optVariant = optionBadgeVariant(definition, colorNamed, opt.id, "elevation-muted")
          return (
            <DropdownMenuItem
              key={opt.id}
              className={isActive ? DROPDOWN_ITEM_ACTIVE_CLS : DROPDOWN_ITEM_INACTIVE_CLS}
              onClick={(e) => {
                e.stopPropagation()
                onPick(opt.id, e.timeStamp)
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

function EmptyOptionBadge() {
  return (
    <Badge variant="elevation-muted">
      <span className="text-tertiary">Empty</span>
    </Badge>
  )
}

function ChosenOptionBadges({
  definition,
  ids,
}: {
  definition: PropertyDefinition
  ids: readonly string[]
}) {
  const options = getOptions(definition)
  const colorNamed = colorNamedByOption(definition)
  const accentVariant = definition.accent ? "accent" : "elevation-muted"
  if (ids.length === 0) return <EmptyOptionBadge />
  return (
    <>
      {ids.map((id) => (
        <Badge
          key={`${definition.id}-${id}`}
          variant={optionBadgeVariant(definition, colorNamed, id, accentVariant)}
        >
          {findOption(options, id)?.label ?? id}
        </Badge>
      ))}
    </>
  )
}

function MultiSelectBadge({
  property,
  ids,
  editable,
  onPropertyChange,
  align,
}: {
  property: PropertyDefinition
  ids: readonly string[]
  editable?: boolean
  onPropertyChange?: PropertyBadgeProps["onPropertyChange"]
  align: "start" | "end"
}) {
  const trigger = (
    <span className={stackedBadgesClass(align)}>
      <ChosenOptionBadges definition={property} ids={ids} />
    </span>
  )
  if (!editable || !onPropertyChange) return trigger
  const change = onPropertyChange
  return (
    <SelectDropdown
      definition={property}
      chosenIds={ids}
      trigger={trigger}
      align={align}
      onPick={(id, eventTimeStamp) =>
        change(
          property.id,
          ids.includes(id) ? ids.filter((one) => one !== id) : [...ids, id],
          eventTimeStamp
        )
      }
    />
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

  if (Array.isArray(value)) {
    return (
      <MultiSelectBadge
        property={property}
        ids={getValueArray(value)}
        editable={editable}
        onPropertyChange={onPropertyChange}
        align={align}
      />
    )
  }

  const options = getOptions(property)
  const option = typeof value === "string" ? findOption(options, value) : undefined
  const colorNamed = colorNamedByOption(property)
  const accentVariant = property.accent ? "accent" : "elevation-muted"

  const trigger = option ? (
    <Badge variant={optionBadgeVariant(property, colorNamed, option.id, accentVariant)}>
      {option.label}
    </Badge>
  ) : (
    <EmptyOptionBadge />
  )

  if (!editable || !onPropertyChange) {
    return trigger
  }

  const change = onPropertyChange
  return (
    <SelectDropdown
      definition={property}
      chosenIds={typeof value === "string" ? [value] : []}
      trigger={trigger}
      align={align}
      onPick={(id, eventTimeStamp) => change(property.id, id, eventTimeStamp)}
    />
  )
}
