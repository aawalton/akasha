import { ITEM_CATEGORY_TREE } from "@akasha/temper-items-core/item-category-tree-data"
import {
  ALL_CATEGORIES_ID,
  ALL_CATEGORIES_NODE,
  type CategoryRule,
  type ItemRule,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import { getNodePath } from "@akasha/temper-items-rules-core/item-category-tree-utils"
import { getActionLabel } from "../action-options/action-options.module.code.ts"

function describeCategoryRule(rule: CategoryRule): string {
  const actionLabel = getActionLabel(rule.action)
  if (rule.title != null) return `${rule.title} — ${actionLabel}`
  if (rule.categoryId === ALL_CATEGORIES_ID) return `${ALL_CATEGORIES_NODE.name} — ${actionLabel}`
  const path = getNodePath(rule.categoryId, ITEM_CATEGORY_TREE)
  const categoryName = path.length > 0 ? path.map((p) => p.name).join(" > ") : rule.categoryId
  return `${categoryName} — ${actionLabel}`
}

function describeItemRule(rule: ItemRule): string {
  const actionLabel = getActionLabel(rule.action)
  return `${rule.title != null && rule.title !== "" ? rule.title : rule.itemName} — ${actionLabel}`
}

export function getCategoryRuleDescriptions(
  rules: readonly CategoryRule[],
  ids: readonly string[]
): readonly string[] {
  const idSet = new Set(ids)
  return rules.filter((r) => idSet.has(r.id)).map(describeCategoryRule)
}

export function getItemRuleDescriptions(
  rules: readonly ItemRule[],
  ids: readonly string[]
): readonly string[] {
  const idSet = new Set(ids)
  return rules.filter((r) => idSet.has(r.id)).map(describeItemRule)
}
