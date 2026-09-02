"use client"

import { ButtonBadge } from "@akasha/design-badges/button-badge"
import type { DestinationChain, Tier } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { Plus } from "lucide-react"
import { RuleCardDestinationTier } from "../rule-card-destination-tier/rule-card-destination-tier.module.code.tsx"
import type { DestinationOptions } from "../use-destination-options/use-destination-options.module.code.ts"

interface RuleCardDestinationChainProps {
  chain: DestinationChain | undefined
  destinationOptions: DestinationOptions
  onChange: (next: DestinationChain | undefined) => void
}

const DEFAULT_TIER: Tier = { destination: "bank", targetQuantity: 200 }

function emit(next: readonly Tier[], onChange: RuleCardDestinationChainProps["onChange"]) {
  onChange(next.length === 0 ? undefined : next)
}

export function RuleCardDestinationChain({
  chain,
  destinationOptions,
  onChange,
}: RuleCardDestinationChainProps) {
  const tiers: readonly Tier[] = chain ?? []

  function handleTierChange(index: number, next: Tier) {
    const updated = tiers.map((t, i) => (i === index ? next : t))
    emit(updated, onChange)
  }

  function handleRemove(index: number) {
    const updated = tiers.filter((_, i) => i !== index)
    emit(updated, onChange)
  }

  function handleMoveUp(index: number) {
    if (index === 0) return
    const updated = [...tiers]
    const [a, b] = [updated[index - 1], updated[index]]
    if (a === undefined || b === undefined) return
    updated[index - 1] = b
    updated[index] = a
    emit(updated, onChange)
  }

  function handleMoveDown(index: number) {
    if (index === tiers.length - 1) return
    const updated = [...tiers]
    const [a, b] = [updated[index], updated[index + 1]]
    if (a === undefined || b === undefined) return
    updated[index] = b
    updated[index + 1] = a
    emit(updated, onChange)
  }

  function handleAddTier() {
    emit([...tiers, DEFAULT_TIER], onChange)
  }

  return (
    <div className="flex flex-col gap-1.5">
      {tiers.map((tier, index) => (
        <RuleCardDestinationTier
          key={index}
          tier={tier}
          index={index}
          totalTiers={tiers.length}
          destinationOptions={destinationOptions}
          onChange={(next) => handleTierChange(index, next)}
          onRemove={() => handleRemove(index)}
          onMoveUp={() => handleMoveUp(index)}
          onMoveDown={() => handleMoveDown(index)}
        />
      ))}
      <div className="flex items-center gap-1.5">
        <ButtonBadge variant="elevation-muted" onClick={handleAddTier}>
          <Plus className="size-3" />
          Add Tier
        </ButtonBadge>
      </div>
    </div>
  )
}
