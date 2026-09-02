import { requireFirst } from "@akasha/utils-narrow/require-first"
import { hasSignals, matchesSignals } from "../classify-item/classify-item.module.code.ts"
import { getCompanionTraitName } from "../companion-trait-labels/companion-trait-labels.module.code.ts"
import type {
  InventoryItemRow,
  InventoryTypeCategory,
  InventoryTypeEntry,
} from "../inventory-grouping-types/inventory-grouping-types.module.code.ts"
import type { InventoryNode } from "../inventory-node-types/inventory-node-types.module.code.ts"
import { ITEM_CATEGORY_TREE } from "../item-category-tree-data/item-category-tree-data.module.code.ts"
import type {
  ItemCategoryNode,
  ItemCategoryTree,
} from "../item-category-tree-types/item-category-tree-types.module.code.ts"
import type { ItemTooltipInstance } from "../item-tooltip-types/item-tooltip-types.module.code.ts"

function buildLeaf(entry: InventoryTypeEntry, useCompanionTraits: boolean): InventoryNode {
  const { row } = entry
  const label = useCompanionTraits
    ? appendCompanionTrait(row.itemName, row.traitType)
    : row.itemName
  const node: InventoryNode & { key: string; label: string } = {
    key: row.key,
    label,
    stackCount: row.stackCount,
    quality: row.quality,
    value: row.value,
    slotCount: 1,
  }
  if (row.replacementValue !== undefined) node.replacementValue = row.replacementValue
  if (row.merchantValue !== undefined) node.merchantValue = row.merchantValue
  if (row.saleAvg !== undefined) node.saleAvg = row.saleAvg
  if (row.minPrice !== undefined) node.minPrice = row.minPrice
  if (row.amountCount !== undefined) node.amountCount = row.amountCount
  if (row.saleAmountCount !== undefined) node.saleAmountCount = row.saleAmountCount
  if (row.suggestedPrice !== undefined) node.suggestedPrice = row.suggestedPrice
  if (row.itemLink != null) {
    node.itemLink = row.itemLink
    const instance: ItemTooltipInstance = {
      quality: row.quality,
      level: row.requiredLevel ?? 0,
      bound: row.bound ?? false,
      stolen: row.stolen ?? false,
      stackCount: row.stackCount,
      charges: 0,
    }
    node.tooltipInstance = instance
  }
  return node
}

function appendCompanionTrait(name: string, traitType: number): string {
  const traitName = getCompanionTraitName(traitType)
  return traitName != null ? `${name} (${traitName})` : name
}

function buildNameGroupedLeaves(
  entries: readonly InventoryTypeEntry[],
  useCompanionTraits: boolean
): readonly InventoryNode[] {
  const nameMap = new Map<string, InventoryTypeEntry[]>()
  for (const entry of entries) {
    const name = useCompanionTraits
      ? appendCompanionTrait(entry.row.itemName, entry.row.traitType)
      : entry.row.itemName
    let list = nameMap.get(name)
    if (!list) {
      list = []
      nameMap.set(name, list)
    }
    list.push(entry)
  }

  const nodes: InventoryNode[] = []
  for (const [name, group] of nameMap) {
    if (group.length === 1) {
      nodes.push(buildLeaf(requireFirst(group, "group"), useCompanionTraits))
    } else if (allSameQuality(group)) {
      nodes.push(buildMergedLeaf(name, group))
    } else {
      nodes.push({
        key: name,
        label: name,
        children: group.map((e) => buildLeaf(e, useCompanionTraits)),
      })
    }
  }
  return nodes
}

function allSameQuality(entries: readonly InventoryTypeEntry[]): boolean {
  const q = requireFirst(entries, "entries").row.quality
  for (const entry of entries) {
    if (entry.row.quality !== q) return false
  }
  return true
}

function buildMergedLeaf(name: string, entries: readonly InventoryTypeEntry[]): InventoryNode {
  let stackCount = 0
  let mergedValue: number | undefined
  let pricingSource: InventoryTypeEntry | undefined
  for (const entry of entries) {
    stackCount += entry.row.stackCount
    if (mergedValue === undefined && entry.row.value !== undefined) {
      mergedValue = entry.row.value
    }
    if (pricingSource === undefined && hasPricingData(entry.row)) {
      pricingSource = entry
    }
  }
  const node: InventoryNode & { key: string; label: string } = {
    key: name,
    label: name,
    stackCount,
    quality: requireFirst(entries, "entries").row.quality,
    value: mergedValue,
    slotCount: entries.length,
  }
  if (pricingSource) {
    const { row } = pricingSource
    if (row.replacementValue !== undefined) node.replacementValue = row.replacementValue
    if (row.merchantValue !== undefined) node.merchantValue = row.merchantValue
    if (row.saleAvg !== undefined) node.saleAvg = row.saleAvg
    if (row.minPrice !== undefined) node.minPrice = row.minPrice
    if (row.amountCount !== undefined) node.amountCount = row.amountCount
    if (row.saleAmountCount !== undefined) node.saleAmountCount = row.saleAmountCount
    if (row.suggestedPrice !== undefined) node.suggestedPrice = row.suggestedPrice
  }
  return node
}

function hasPricingData(row: InventoryItemRow): boolean {
  return (
    row.value !== undefined ||
    row.replacementValue !== undefined ||
    row.merchantValue !== undefined ||
    row.saleAvg !== undefined ||
    row.minPrice !== undefined
  )
}

function buildDataDrivenNodes(
  entries: readonly InventoryTypeEntry[],
  treeChildren: readonly ItemCategoryNode[],
  depth: number,
  useCompanionTraits: boolean
): readonly InventoryNode[] {
  const claimed = new Set<InventoryTypeEntry>()
  const nodes: InventoryNode[] = []

  for (const child of treeChildren) {
    const matched: InventoryTypeEntry[] = []
    for (const entry of entries) {
      if (claimed.has(entry)) continue
      const segment = entry.path[depth]
      if (segment === child.name) {
        matched.push(entry)
        claimed.add(entry)
      } else if (segment === undefined && hasSignals(child) && matchesSignals(entry.row, child)) {
        matched.push(entry)
        claimed.add(entry)
      }
    }

    if (matched.length === 0) continue

    if (child.children) {
      const children = buildDataDrivenNodes(matched, child.children, depth + 1, useCompanionTraits)
      if (children.length > 0) {
        nodes.push({ key: child.id, label: child.name, children })
      }
    } else {
      nodes.push({
        key: child.id,
        label: child.name,
        children: buildNameGroupedLeaves(matched, useCompanionTraits),
      })
    }
  }

  const unmatched = entries.filter((e) => !claimed.has(e))
  if (unmatched.length > 0) {
    nodes.push(...buildNameGroupedLeaves(unmatched, useCompanionTraits))
  }

  return nodes
}

export function buildInventoryTypeNodes(
  entries: readonly InventoryTypeEntry[],
  category: InventoryTypeCategory
): readonly InventoryNode[] {
  const treeKey = category.toLowerCase()
  const tree: ItemCategoryTree = ITEM_CATEGORY_TREE
  const treeNode = tree[treeKey]

  if (!treeNode?.children) {
    return buildNameGroupedLeaves(entries, category === "Companion")
  }

  const useCompanionTraits = category === "Companion"
  return buildDataDrivenNodes(entries, treeNode.children, 1, useCompanionTraits)
}
