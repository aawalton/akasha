"use client"

import { Badge } from "@akasha/design-badges/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { Text } from "@akasha/design-primitives/text-body"
import type { RequiredCurseStateCondition } from "@akasha/temper-items-rules-core/required-curse-state-filter-types"
import type { ReactNode } from "react"
import type { useRuleCard } from "../use-rule-card/use-rule-card.module.code.ts"

type RuleCardState = ReturnType<typeof useRuleCard>

interface RuleCardFilterChipRequiredCurseStateProps {
  state: Pick<
    RuleCardState,
    "requiredCurseStateValue" | "handleRequiredCurseStateChange" | "handleRemoveFilter"
  >
}

const STATE_OPTIONS: readonly { value: RequiredCurseStateCondition["state"]; label: string }[] = [
  { value: "vampire", label: "Vampire" },
  { value: "werewolf", label: "Werewolf" },
]

export function RuleCardFilterChipRequiredCurseState({
  state,
}: RuleCardFilterChipRequiredCurseStateProps): ReactNode {
  const { requiredCurseStateValue, handleRequiredCurseStateChange, handleRemoveFilter } = state

  const selectedOption = STATE_OPTIONS.find((o) => o.value === requiredCurseStateValue?.state)
  const triggerLabel = selectedOption?.label ?? "Select Curse State"

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={selectedOption !== undefined ? "accent" : "elevation-muted"}
          className="shrink-0 cursor-pointer"
          asChild
          onRemove={() => handleRemoveFilter("required-curse-state")}
          removeLabel="Remove required curse state filter"
        >
          <span>{triggerLabel}</span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2">
        <Text variant="hint" className="font-medium">
          Curse State
        </Text>
        <Select
          value={requiredCurseStateValue?.state ?? ""}
          onValueChange={handleRequiredCurseStateChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Curse State" />
          </SelectTrigger>
          <SelectContent>
            {STATE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  )
}
