import { expect, test } from "bun:test"
import {
  categoriesSaid,
  categoryRows,
} from "akasha/commands/pages/temper/inventory/category-list/temper-inventory-category-list.command.code.ts"
import {
  ITEM_CATEGORY_PRIORITY,
  ITEM_CATEGORY_TREE,
} from "akasha/temper/items-core/item-category-tree-data/item-category-tree-data.module.code.ts"
import type { ItemCategoryTree } from "akasha/temper/items-core/item-category-tree-types/item-category-tree-types.module.code.ts"

const PROBE: ItemCategoryTree = {
  currency: {
    id: "currency",
    name: "Currency",
    children: [{ id: "currency-gold", name: "Gold" }],
  },
  tasks: { id: "tasks", name: "Tasks" },
}

test("the category every item is in comes first and parents every root", () => {
  const rows = categoryRows(PROBE, ["currency", "tasks"])
  expect(rows[0]).toEqual({ id: "all", name: "All Categories", parent: null, depth: 0 })
  expect(rows[1]?.parent).toBe("all")
  expect(rows.at(-1)?.parent).toBe("all")
})

test("a child follows its parent and sits one deeper", () => {
  const rows = categoryRows(PROBE, ["currency", "tasks"])
  expect(rows.map((one) => one.id)).toEqual(["all", "currency", "currency-gold", "tasks"])
  expect(rows[2]).toEqual({ id: "currency-gold", name: "Gold", parent: "currency", depth: 2 })
})

test("a root the tree does not hold is passed over rather than refused", () => {
  expect(categoryRows(PROBE, ["currency", "nowhere"]).map((one) => one.id)).toEqual([
    "all",
    "currency",
    "currency-gold",
  ])
})

test("how deep a category sits is how far it is indented", () => {
  const said = categoriesSaid(categoryRows(PROBE, ["currency", "tasks"]))
  expect(said[1]).toBe("  all — All Categories")
  expect(said[2]).toBe("    currency — Currency")
  expect(said[3]).toBe("      currency-gold — Gold")
})

test("every root the real tree names is given, under the category every item is in", () => {
  const rows = categoryRows(ITEM_CATEGORY_TREE, ITEM_CATEGORY_PRIORITY)
  const roots = rows.filter((one) => one.depth === 1).map((one) => one.id)
  expect(roots).toEqual([...ITEM_CATEGORY_PRIORITY])
})

test("no category is named twice", () => {
  const ids = categoryRows(ITEM_CATEGORY_TREE, ITEM_CATEGORY_PRIORITY).map((one) => one.id)
  expect(ids.length).toBe(new Set(ids).size)
})
