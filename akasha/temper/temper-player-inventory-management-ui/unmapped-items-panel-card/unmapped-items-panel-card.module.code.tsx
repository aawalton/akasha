"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { ItemRow } from "@akasha/design-patterns/item-row"
import { formatGold } from "@akasha/design-primitives/format-gold"
import { Text } from "@akasha/design-primitives/text-body"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { useMemo } from "react"
import { AffectedItemsViews } from "../affected-items-views/affected-items-views.module.code.tsx"
import {
  decideUnmappedItemsPanelState,
  type InventoryReadState,
  type UnmappedItemsPanelState,
} from "../rules-tab-panel-states/rules-tab-panel-states.module.code.ts"

interface UnmappedItemsPanelCardProps extends InventoryReadState {
  items: readonly AffectedItem[]
  totalCount: number
}

function emptyHint(state: Exclude<UnmappedItemsPanelState, "items">): string {
  switch (state) {
    case "loading":
      return "Loading your inventory."
    case "no-inventory":
      return "No inventory has reached this page, so nothing has been checked against your rules."
    case "hidden-by-filter":
      return "Every unmapped item is at another location. Clear the location filter to see them."
    case "all-covered":
      return "All inventory items are covered by a rule."
    default:
      return assertNever(state)
  }
}

export function UnmappedItemsPanelCard({
  items,
  totalCount,
  isInventoryLoading,
  hasInventory,
}: UnmappedItemsPanelCardProps) {
  const total = useMemo(() => {
    let stackCount = 0
    let totalValue: number | undefined
    for (const entry of items) {
      stackCount += entry.item.stackCount
      if (entry.item.estimatedValue !== undefined) {
        totalValue = (totalValue ?? 0) + entry.item.estimatedValue * entry.item.stackCount
      }
    }
    return { stackCount, totalValue }
  }, [items])

  const state = decideUnmappedItemsPanelState({
    isInventoryLoading,
    hasInventory,
    visibleCount: items.length,
    totalCount,
  })

  return (
    <PanelCard id="unmapped-items" collapsible forceMount title="Unmapped Items">
      {state !== "items" ? (
        <Text variant="hint" className="py-4 text-center">
          {emptyHint(state)}
        </Text>
      ) : (
        <AffectedItemsViews
          items={items}
          defaultView="type"
          showFlatTab={false}
          header={
            <ItemRow
              label="Total"
              quantity={total.stackCount}
              value={total.totalValue !== undefined ? formatGold(total.totalValue) : undefined}
              accent
              actionButtonCount={1}
            />
          }
        />
      )}
    </PanelCard>
  )
}
