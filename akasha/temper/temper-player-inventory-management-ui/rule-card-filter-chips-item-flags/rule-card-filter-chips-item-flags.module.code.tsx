"use client"

import { Badge } from "@akasha/design-badges/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { KNOWN_OPTIONS } from "@akasha/temper-items-rules-core/known-filter"
import { RECONSTRUCTED_OPTIONS } from "@akasha/temper-items-rules-core/reconstructed-filter"
import { TRANSMUTED_OPTIONS } from "@akasha/temper-items-rules-core/transmuted-filter"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { ReactNode } from "react"
import type { useRuleCard } from "../use-rule-card/use-rule-card.module.code.ts"

type RuleCardState = ReturnType<typeof useRuleCard>

export type ItemFlagChipId = "reconstructed" | "transmuted" | "known"

interface ItemFlagChipProps {
  id: ItemFlagChipId
  state: Pick<
    RuleCardState,
    | "reconstructedValue"
    | "transmutedValue"
    | "knownValue"
    | "handleReconstructedChange"
    | "handleTransmutedChange"
    | "handleKnownChange"
    | "handleRemoveFilter"
  >
}

export function ItemFlagChip({ id, state }: ItemFlagChipProps): ReactNode {
  const {
    reconstructedValue,
    transmutedValue,
    knownValue,
    handleReconstructedChange,
    handleTransmutedChange,
    handleKnownChange,
    handleRemoveFilter,
  } = state

  switch (id) {
    case "reconstructed":
      return (
        <Select value={reconstructedValue} onValueChange={handleReconstructedChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("reconstructed")}
              removeLabel="Remove reconstructed status filter"
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {RECONSTRUCTED_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "transmuted":
      return (
        <Select value={transmutedValue} onValueChange={handleTransmutedChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("transmuted")}
              removeLabel="Remove transmuted status filter"
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {TRANSMUTED_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "known":
      return (
        <Select value={knownValue} onValueChange={handleKnownChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("known")}
              removeLabel="Remove known status filter"
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {KNOWN_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    default:
      return assertNever(id)
  }
}
