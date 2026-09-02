import type { ItemAction } from "@akasha/temper-items-rules-core/inventory-rule-types"
import type {
  ActionGroup,
  PlanItem,
} from "@akasha/temper-items-rules-routing-core/inventory-management-plan-types"
import { assertNever } from "@akasha/utils-narrow/assert-never"

function getGroupLabel(action: ItemAction): string {
  switch (action) {
    case "sell":
      return "Sell"
    case "destroy":
      return "Destroy"
    case "fence-sell":
      return "Sell"
    case "fence-launder":
      return "Launder"
    case "list":
      return "List"
    case "mail":
      return "Mail"
    case "deconstruct":
      return "Deconstruct"
    case "refine":
      return "Refine"
    case "research":
      return "Research"
    case "character-equip":
      return "Equip"
    case "companion-equip":
      return "Companion Equip"
    case "use":
      return "Use"
    case "open":
      return "Open"
    case "move-to":
      return "Move"
    case "stock":
      return "Stock"
    case "nothing":
    case "lock":
    case "unlock":
      return action
    default:
      return assertNever(action)
  }
}

export function buildActionGroups(items: readonly PlanItem[]): readonly ActionGroup[] {
  const groupMap = new Map<string, PlanItem[]>()
  for (const item of items) {
    const key = item.note ?? getGroupLabel(item.action)
    let group = groupMap.get(key)
    if (!group) {
      group = []
      groupMap.set(key, group)
    }
    group.push(item)
  }
  const groups: ActionGroup[] = []
  for (const [label, groupItems] of groupMap) {
    const mergedItems = mergeDisplayItems(groupItems).toSorted((a, b) =>
      a.itemName.localeCompare(b.itemName)
    )
    const totalValue = sumItemValues(mergedItems)
    groups.push({ label, items: mergedItems, slotCount: mergedItems.length, totalValue })
  }
  return groups
}

function sumItemValues(items: readonly PlanItem[]): number | undefined {
  let total = 0
  let any = false
  for (const item of items) {
    if (item.value !== undefined) {
      total += item.value * item.stackCount
      any = true
    }
  }
  return any ? total : undefined
}

export function sumTotalValues(values: readonly (number | undefined)[]): number | undefined {
  let total = 0
  let any = false
  for (const v of values) {
    if (v !== undefined) {
      total += v
      any = true
    }
  }
  return any ? total : undefined
}

function mergeDisplayItems(items: readonly PlanItem[]): readonly PlanItem[] {
  const mergeMap = new Map<string, PlanItem>()
  const result: PlanItem[] = []
  for (const item of items) {
    const key = `${item.itemId}\0${item.quality}\0${item.note ?? ""}`
    const existing = mergeMap.get(key)
    if (existing) {
      existing.stackCount += item.stackCount
    } else {
      const copy = { ...item }
      mergeMap.set(key, copy)
      result.push(copy)
    }
  }
  return result
}
