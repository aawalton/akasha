"use client"

import type {
  DestinationChain,
  ItemRule,
  MoveToDestination,
  StockScope,
  Tier,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import {
  ACTION_OPTIONS,
  SELL_ACTIONS,
  SELL_DESTINATION_OPTIONS,
} from "../action-options/action-options.module.code.ts"

type UpdateItemRule = (
  ruleId: string,
  patch: Partial<
    Pick<
      ItemRule,
      | "action"
      | "destination"
      | "active"
      | "goal"
      | "title"
      | "notes"
      | "stockQuantity"
      | "stockScope"
      | "destinationChain"
    >
  >
) => void

export interface ItemRuleActionHandlers {
  useChain: boolean
  handleActionChange: (value: string) => void
  handleDestinationChange: (value: MoveToDestination) => void
  handleSellDestinationChange: (value: string) => void
  handleStockScopeChange: (patch: {
    stockScope: StockScope
    destination: MoveToDestination
  }) => void
  handleDestinationChainChange: (next: DestinationChain | undefined) => void
  handleToggleDestinationChain: (useChainNext: boolean) => void
}

export function itemRuleActionHandlers(
  rule: ItemRule,
  onUpdate: UpdateItemRule
): ItemRuleActionHandlers {
  function handleActionChange(value: string) {
    const option = ACTION_OPTIONS.find((o) => o.value === value)
    if (!option) return
    if (option.value === "character-equip" || option.value === "companion-equip") {
      onUpdate(rule.id, { action: option.value, destination: rule.destination })
      return
    }
    if (option.value === "stock") {
      onUpdate(rule.id, {
        action: option.value,
        destination: rule.destination ?? "bank",
        stockQuantity: rule.stockQuantity ?? 200,
      })
      return
    }
    if (option.value === "move-to") {
      onUpdate(rule.id, { action: option.value, destination: rule.destination ?? "bank" })
    } else if (option.value === "sell") {
      if (!SELL_ACTIONS.has(rule.action)) {
        onUpdate(rule.id, { action: "sell", destination: undefined })
      }
    } else {
      onUpdate(rule.id, { action: option.value, destination: undefined })
    }
  }

  function handleDestinationChange(value: MoveToDestination) {
    onUpdate(rule.id, { destination: value })
  }

  function handleSellDestinationChange(value: string) {
    const opt = SELL_DESTINATION_OPTIONS.find((o) => o.value === value)
    if (!opt) return
    onUpdate(rule.id, { action: opt.value })
  }

  const useChain = rule.destinationChain !== undefined && rule.destinationChain.length > 0

  function handleStockScopeChange(patch: {
    stockScope: StockScope
    destination: MoveToDestination
  }) {
    onUpdate(rule.id, patch)
  }

  function handleDestinationChainChange(next: DestinationChain | undefined) {
    if (next === undefined) {
      onUpdate(rule.id, { destinationChain: undefined })
      return
    }
    onUpdate(rule.id, { destinationChain: next, destination: undefined, stockScope: undefined })
  }

  function handleToggleDestinationChain(useChainNext: boolean) {
    if (useChainNext) {
      const initialTier: Tier = {
        destination: rule.destination ?? "bank",
        targetQuantity: rule.stockQuantity ?? 200,
      }
      onUpdate(rule.id, {
        destinationChain: [initialTier],
        destination: undefined,
        stockScope: undefined,
      })
      return
    }
    onUpdate(rule.id, {
      destinationChain: undefined,
      destination: rule.destination ?? "bank",
      stockScope: rule.stockScope ?? "any-character",
    })
  }

  return {
    useChain,
    handleActionChange,
    handleDestinationChange,
    handleSellDestinationChange,
    handleStockScopeChange,
    handleDestinationChainChange,
    handleToggleDestinationChain,
  }
}
