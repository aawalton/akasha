import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { CategoryRule, ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { getActionLabel } from "../action-options/action-options.module.code.ts"
import type { RuleSortField } from "../inventory-filter-types/inventory-filter-types.module.code.ts"

export function sortCategoryRules(
  subset: readonly CategoryRule[],
  sortBy: RuleSortField,
  sortDir: SortDirection,
  getSearchText: (r: CategoryRule) => string
): readonly CategoryRule[] {
  if (sortBy === "priority") return subset
  const dir = sortDir === "asc" ? 1 : -1
  return [...subset].sort((a, b) => {
    let aVal = ""
    let bVal = ""
    switch (sortBy) {
      case "name":
        aVal = (a.title ?? getSearchText(a)).toLowerCase()
        bVal = (b.title ?? getSearchText(b)).toLowerCase()
        break
      case "action":
        aVal = getActionLabel(a.action).toLowerCase()
        bVal = getActionLabel(b.action).toLowerCase()
        break
      case "goal":
        aVal = (a.goal ?? "").toLowerCase()
        bVal = (b.goal ?? "").toLowerCase()
        break
      case "updated":
        return dir * ((a.updatedAt ?? 0) - (b.updatedAt ?? 0))
      default:
        assertNever(sortBy)
    }
    return dir * aVal.localeCompare(bVal)
  })
}

export function sortItemRules(
  subset: readonly ItemRule[],
  sortBy: RuleSortField,
  sortDir: SortDirection
): readonly ItemRule[] {
  if (sortBy === "priority") return subset
  const dir = sortDir === "asc" ? 1 : -1
  return [...subset].sort((a, b) => {
    let aVal = ""
    let bVal = ""
    switch (sortBy) {
      case "name":
        aVal = (a.title ?? a.itemName).toLowerCase()
        bVal = (b.title ?? b.itemName).toLowerCase()
        break
      case "action":
        aVal = getActionLabel(a.action).toLowerCase()
        bVal = getActionLabel(b.action).toLowerCase()
        break
      case "goal":
        aVal = (a.goal ?? "").toLowerCase()
        bVal = (b.goal ?? "").toLowerCase()
        break
      case "updated":
        return dir * ((a.updatedAt ?? 0) - (b.updatedAt ?? 0))
      default:
        assertNever(sortBy)
    }
    return dir * aVal.localeCompare(bVal)
  })
}
