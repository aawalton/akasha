import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { refusedBy, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { temperInventoryCategoryList as page } from "akasha/command/pages/temper/inventory/category-list/temper-inventory-category-list.command.ts"
import {
  categoryTitleOf,
  type ItemCategories,
} from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.code.ts"
import { loadItemCategoryTree } from "akasha/temper/items/core/modules/item-category-tree-loading/item-category-tree-loading.module.code.ts"
import type { ItemCategoryNode } from "akasha/temper/items/core/modules/item-category-tree-types/item-category-tree-types.module.code.ts"
import { ALL_CATEGORIES_ID } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

const TAKES = [json]

const SPACES = 2

const HEADER = "[TemperItems] Categories:"

const INDENT = "  "

interface CategoryRow {
  readonly id: string
  readonly name: string
  readonly parent: string | null
  readonly depth: number
}

export function categoryRows(categories: ItemCategories): readonly CategoryRow[] {
  const rows: CategoryRow[] = [
    {
      id: ALL_CATEGORIES_ID,
      name: categoryTitleOf(categories, ALL_CATEGORIES_ID),
      parent: null,
      depth: 0,
    },
  ]
  function walk(node: ItemCategoryNode, parent: string, depth: number): undefined {
    rows.push({ id: node.id, name: node.name, parent, depth })
    for (const child of node.children ?? []) walk(child, node.id, depth + 1)
    return undefined
  }
  for (const node of categories.roots) walk(node, ALL_CATEGORIES_ID, 1)
  return rows
}

export function categoriesSaid(rows: readonly CategoryRow[]): readonly string[] {
  return [HEADER, ...rows.map((one) => `${INDENT.repeat(one.depth + 1)}${one.id} — ${one.name}`)]
}

export async function temperInventoryCategoryList(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return refusedBy(read.refused)
  const rows = categoryRows(await loadItemCategoryTree())
  if (read.taken.json) return told(JSON.stringify(rows, null, SPACES).split("\n"))
  return told([...categoriesSaid(rows)])
}
