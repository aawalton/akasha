import type { ItemCategoryNode } from "@akasha/temper-items-core/item-category-tree-types"
import {
  ALL_CATEGORIES_ID,
  type CategoryRule,
  type ItemAction,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"

function buildAncestorMap(categories: Record<string, ItemCategoryNode>): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>()

  function walk(node: ItemCategoryNode, ancestors: Set<string>) {
    map.set(node.id, new Set(ancestors))
    if (node.children) {
      const childAncestors = new Set(ancestors)
      childAncestors.add(node.id)
      for (const child of node.children) {
        walk(child, childAncestors)
      }
    }
  }

  for (const category of Object.values(categories)) {
    walk(category, new Set())
  }

  return map
}

function ruleMatchesNode(
  rule: CategoryRule,
  nodeId: string,
  ancestorMap: Map<string, Set<string>>
): boolean {
  if (rule.categoryId === ALL_CATEGORIES_ID) return true
  if (rule.categoryId === nodeId) return true
  const ancestors = ancestorMap.get(nodeId)
  return ancestors?.has(rule.categoryId) ?? false
}

export function resolveAllRuleStates(
  rules: readonly CategoryRule[],
  categories: Record<string, ItemCategoryNode>
): Record<string, ItemAction | null> {
  const ancestorMap = buildAncestorMap(categories)
  const result: Record<string, ItemAction | null> = {}

  function walk(node: ItemCategoryNode) {
    let action: ItemAction | null = null
    for (const rule of rules) {
      if (ruleMatchesNode(rule, node.id, ancestorMap)) {
        action = rule.action
        break
      }
    }
    result[node.id] = action
    if (node.children) {
      for (const child of node.children) {
        walk(child)
      }
    }
  }

  for (const category of Object.values(categories)) {
    walk(category)
  }

  return result
}
