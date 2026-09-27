import { expect, test } from "bun:test"
import {
  categoriesSaid,
  categoryRows,
} from "akasha/command/pages/temper/inventory/category-list/temper-inventory-category-list.command.code.ts"
import type { ItemCategories } from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.code.ts"
import { holdItemCategoryTreeFromCheckout } from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.test-fixtures.ts"

const PROBE: ItemCategories = {
  roots: [
    {
      id: "currency",
      name: "Currency",
      children: [{ id: "currency-gold", name: "Gold" }],
    },
    { id: "tasks", name: "Tasks" },
  ],
  keyed: {},
  titles: new Map([["all", "All Categories"]]),
}

const REAL = holdItemCategoryTreeFromCheckout()

test("the category every item is in comes first and parents every root", () => {
  const rows = categoryRows(PROBE)
  expect(rows[0]).toEqual({ id: "all", name: "All Categories", parent: null, depth: 0 })
  expect(rows[1]?.parent).toBe("all")
  expect(rows.at(-1)?.parent).toBe("all")
})

test("a child follows its parent and sits one deeper", () => {
  const rows = categoryRows(PROBE)
  expect(rows.map((one) => one.id)).toEqual(["all", "currency", "currency-gold", "tasks"])
  expect(rows[2]).toEqual({ id: "currency-gold", name: "Gold", parent: "currency", depth: 2 })
})

test("how deep a category sits is how far it is indented", () => {
  const said = categoriesSaid(categoryRows(PROBE))
  expect(said[1]).toBe("  all — All Categories")
  expect(said[2]).toBe("    currency — Currency")
  expect(said[3]).toBe("      currency-gold — Gold")
})

test("every root the tree read from the pages holds is given, in its order", () => {
  const rows = categoryRows(REAL)
  const roots = rows.filter((one) => one.depth === 1).map((one) => one.id)
  expect(roots).toEqual(REAL.roots.map((one) => one.id))
})

test("no category is named twice", () => {
  const ids = categoryRows(REAL).map((one) => one.id)
  expect(ids.length).toBe(new Set(ids).size)
})
