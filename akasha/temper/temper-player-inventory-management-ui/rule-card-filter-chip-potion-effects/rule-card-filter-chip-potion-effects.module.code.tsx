"use client"

import { Badge } from "@akasha/design-badges/badge"
import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "@akasha/design-badges/badge-toggle-group"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { Text } from "@akasha/design-primitives/text-body"
import { POTION_EFFECTS_OPTIONS } from "@akasha/temper-items-rules-core/potion-effects-filter"
import type { ReactNode } from "react"
import type { useRuleCard } from "../use-rule-card/use-rule-card.module.code.ts"

type RuleCardState = ReturnType<typeof useRuleCard>

interface RuleCardFilterChipPotionEffectsProps {
  state: Pick<
    RuleCardState,
    | "potionEffectsValue"
    | "handlePotionEffectsChange"
    | "handlePotionEffectsModeChange"
    | "handleRemoveFilter"
  >
}

const EFFECT_OPTIONS: readonly BadgeToggleGroupItem[] = POTION_EFFECTS_OPTIONS.map((o) => ({
  value: o.value,
  label: o.label,
}))

const MODE_OPTIONS: readonly { value: "all" | "any"; label: string }[] = [
  { value: "any", label: "any effect" },
  { value: "all", label: "all effects" },
]

export function RuleCardFilterChipPotionEffects({
  state,
}: RuleCardFilterChipPotionEffectsProps): ReactNode {
  const {
    potionEffectsValue,
    handlePotionEffectsChange,
    handlePotionEffectsModeChange,
    handleRemoveFilter,
  } = state

  const selectedItems: readonly BadgeToggleGroupItem[] = potionEffectsValue.effects
    .map((id) => EFFECT_OPTIONS.find((o) => o.value === id))
    .filter((opt): opt is BadgeToggleGroupItem => opt !== undefined)

  const triggerLabel =
    selectedItems.length === 0
      ? "Select Effects"
      : `${selectedItems.length} Effect${selectedItems.length === 1 ? "" : "s"}`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={selectedItems.length > 0 ? "accent" : "elevation-muted"}
          className="shrink-0 cursor-pointer"
          asChild
          onRemove={() => handleRemoveFilter("potion-effects")}
          removeLabel="Remove potion effects filter"
        >
          <span>
            {triggerLabel}
            {selectedItems.length > 0 && (
              <>
                {" — "}
                {MODE_OPTIONS.find((o) => o.value === potionEffectsValue.mode)?.label}
              </>
            )}
          </span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2">
        <Text variant="hint" className="font-medium">
          Mode
        </Text>
        <Select value={potionEffectsValue.mode} onValueChange={handlePotionEffectsModeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MODE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Text variant="hint" className="font-medium">
          Effects
        </Text>
        <BadgeToggleGroup
          items={EFFECT_OPTIONS}
          value={selectedItems}
          onSelect={handlePotionEffectsChange}
          unselectedVariant="elevation"
          wrap
        />
      </PopoverContent>
    </Popover>
  )
}
