"use client"

import type {
  InventoryLocationGroup,
  InventoryLocationSummary,
} from "@akasha/temper-items-core/inventory-grouping"
import type { InventoryNode } from "@akasha/temper-items-core/inventory-node-types"
import { type LocationTypeId, locationTypes } from "@akasha/temper-items-core/location-type-data"
import { InventoryPanelCard } from "../inventory-panel-card/inventory-panel-card.module.code.tsx"

interface InventoryLocationSummaryPanelCardProps {
  summary: InventoryLocationSummary
  currencyCount?: number
  currencyGoldTotal?: number
  onItemClick?: (key: string) => void
  scopeNote?: React.ReactNode
}

function buildSummaryNodes(groups: readonly InventoryLocationGroup[]): readonly InventoryNode[] {
  const typeMap = new Map<LocationTypeId, InventoryLocationGroup[]>()
  for (const group of groups) {
    let list = typeMap.get(group.locationType)
    if (!list) {
      list = []
      typeMap.set(group.locationType, list)
    }
    list.push(group)
  }

  const nodes: InventoryNode[] = []
  for (const [locationType, locationGroups] of typeMap) {
    if (locationGroups.length === 1) {
      const group = locationGroups[0]
      if (group === undefined) continue
      const leaf: InventoryNode = {
        key: locationType,
        label: group.displayName,
        stackCount: group.totalItems,
        totalValue: group.totalValue,
        slotCount: group.occupiedSlots,
      }
      if (group.bagCapacity !== undefined) leaf.bagCapacity = group.bagCapacity
      nodes.push(leaf)
      continue
    }

    let totalItems = 0
    let totalValue = 0
    let occupiedSlots = 0
    for (const group of locationGroups) {
      totalItems += group.totalItems
      totalValue += group.totalValue ?? 0
      occupiedSlots += group.occupiedSlots
    }
    nodes.push({
      key: locationType,
      label: locationTypes.data[locationType]?.name ?? locationType,
      stackCount: totalItems,
      totalValue,
      slotCount: occupiedSlots,
    })
  }
  return nodes
}

export function InventoryLocationSummaryPanelCard({
  summary,
  currencyCount,
  currencyGoldTotal,
  onItemClick,
  scopeNote,
}: InventoryLocationSummaryPanelCardProps) {
  const baseNodes = buildSummaryNodes(summary.groups)
  const items: readonly InventoryNode[] =
    currencyCount !== undefined
      ? [
          ...baseNodes,
          {
            key: "currencies",
            label: "Currencies",
            stackCount: currencyCount,
            totalValue: currencyGoldTotal,
          },
        ]
      : baseNodes

  return (
    <InventoryPanelCard
      id="inventory-location-summary"
      title="Summary"
      items={items}
      collapseProtected
      onItemClick={onItemClick}
      actionButtonCount={0}
      scopeNote={scopeNote}
    />
  )
}
