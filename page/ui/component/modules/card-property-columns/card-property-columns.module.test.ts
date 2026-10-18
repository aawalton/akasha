import { expect, test } from "bun:test"
import { orderTableColumns } from "akasha/page/ui/component/modules/card-property-columns/card-property-columns.module.code.ts"
import { reorderVisibleProperties } from "akasha/page/ui/component/modules/page-table-column-dnd-helpers/page-table-column-dnd-helpers.module.code.ts"

const STOPLIGHTS = { id: "stoplights", title: "Stoplights" } as Parameters<
  typeof orderTableColumns
>[0][number]

test("a table's title column is kept in a view's properties as the declared `title` key", () => {
  const order = reorderVisibleProperties(["stoplights"], ["title", "stoplights"])
  expect(order).toEqual(["title", "stoplights"])
  expect(order.every((one) => !one.startsWith("__"))).toBe(true)
})

test("the title column sits where a view's properties name `title`", () => {
  const columns = orderTableColumns([STOPLIGHTS], ["stoplights", "title"])
  expect(columns.map((one) => [one.id, one.isTitle])).toEqual([
    ["stoplights", false],
    ["title", true],
  ])
})

test("a view naming no title column has it first, named by the `title` key", () => {
  const first = orderTableColumns([STOPLIGHTS], ["stoplights"])[0]
  expect([first?.id, first?.isTitle]).toEqual(["title", true])
})
