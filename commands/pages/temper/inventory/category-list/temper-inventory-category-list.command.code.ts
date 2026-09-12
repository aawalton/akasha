import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { refusedBy, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryCategoryList as page } from "akasha/commands/pages/temper/inventory/category-list/temper-inventory-category-list.command.ts"
import {
  ITEM_CATEGORY_PRIORITY,
  ITEM_CATEGORY_TREE,
} from "akasha/temper/items-core/item-category-tree-data/item-category-tree-data.module.code.ts"
import type {
  ItemCategoryNode,
  ItemCategoryTree,
} from "akasha/temper/items-core/item-category-tree-types/item-category-tree-types.module.code.ts"
import {
  ALL_CATEGORIES_ID,
  ALL_CATEGORIES_NODE,
} from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

const TAKES = [json]

const SPACES = 2

const HEADER = "[TemperInventory] Categories:"

const INDENT = "  "

export interface CategoryRow {
  readonly id: string
  readonly name: string
  readonly parent: string | null
  readonly depth: number
}

export function categoryRows(
  tree: ItemCategoryTree,
  roots: readonly string[]
): readonly CategoryRow[] {
  const rows: CategoryRow[] = [
    { id: ALL_CATEGORIES_ID, name: ALL_CATEGORIES_NODE.name, parent: null, depth: 0 },
  ]
  function walk(node: ItemCategoryNode, parent: string, depth: number): undefined {
    rows.push({ id: node.id, name: node.name, parent, depth })
    for (const child of node.children ?? []) walk(child, node.id, depth + 1)
    return undefined
  }
  for (const key of roots) {
    const node = tree[key]
    if (node === undefined) continue
    walk(node, ALL_CATEGORIES_ID, 1)
  }
  return rows
}

export function categoriesSaid(rows: readonly CategoryRow[]): readonly string[] {
  return [HEADER, ...rows.map((one) => `${INDENT.repeat(one.depth + 1)}${one.id} — ${one.name}`)]
}

export function temperInventoryCategoryList(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused))
  const rows = categoryRows(ITEM_CATEGORY_TREE, ITEM_CATEGORY_PRIORITY)
  if (read.taken.json) return Promise.resolve(told(JSON.stringify(rows, null, SPACES).split("\n")))
  return Promise.resolve(told([...categoriesSaid(rows)]))
}
