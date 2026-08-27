import { describe, expect, test } from "bun:test"
import { isFileSpelledView, viewDataOfPage } from "./view-data-of-page"

const tasksToday = {
  nav: "tasks",
  pageType: "to-do",
  sortOrder: "0",
  layout: "cards",
  where: '{"due-date":{"before":"eso-day-next"}}',
  sortBy: ["priority", "title"],
  pageSize: "40",
  visibleProperties: ["priority", "due-date", "value-slug"],
  slug: "tasks-today",
  title: "Today",
}

describe("viewDataOfPage, on a view that stands in a file", () => {
  test("names the page type by slug and resolves it to the row id", () => {
    const data = viewDataOfPage(tasksToday, (slug) => (slug === "to-do" ? "TODO-ID" : undefined))
    expect(data?.pageTypeSlug).toBe("to-do")
    expect(data?.pageTypeId).toBe("TODO-ID")
  })

  test("keeps the slug when no page type row answers to it", () => {
    const data = viewDataOfPage(tasksToday, () => undefined)
    expect(data?.pageTypeSlug).toBe("to-do")
    expect(data?.pageTypeId).toBeUndefined()
  })

  test("reads `where` from the JSON text the file value arrives as", () => {
    const data = viewDataOfPage(tasksToday)
    expect(data?.filters).toEqual([
      { propertyId: "dueDate", operator: "lte", value: { sentinel: "today" } },
    ])
  })

  test("carries every page-query test across to a filter operator", () => {
    const data = viewDataOfPage({
      pageType: "x",
      where: JSON.stringify({
        status: { in: ["In Progress", "Following"] },
        kind: { is: "book" },
        tag: { "not-in": ["dead"] },
        list: { has: "one" },
        "completed-at": { empty: true },
        cover: { empty: false },
        "due-date": { "at-or-after": "eso-day-next" },
        seq: { before: 5 },
      }),
    })
    expect(data?.filters).toEqual(
      expect.arrayContaining([
        { propertyId: "status", operator: "includes", value: ["In Progress", "Following"] },
        { propertyId: "kind", operator: "equals", value: "book" },
        { propertyId: "tag", operator: "not_includes", value: ["dead"] },
        { propertyId: "list", operator: "includes", value: "one" },
        { propertyId: "completedAt", operator: "is_empty" },
        { propertyId: "cover", operator: "is_not_empty" },
        { propertyId: "dueDate", operator: "gt", value: { sentinel: "today" } },
        { propertyId: "seq", operator: "lt", value: 5 },
      ])
    )
  })

  test("pairs each sort key with a direction, reading `sort-descending`", () => {
    const data = viewDataOfPage({
      pageType: "x",
      sortBy: ["rank", "title"],
      sortDescending: ["rank"],
    })
    expect(data?.sorts).toEqual([
      { field: "rank", direction: "desc" },
      { field: "title", direction: "asc" },
    ])
  })

  test("reads the numbers a file carries as text", () => {
    const data = viewDataOfPage({ pageType: "x", pageSize: "40", itemPageSize: "12" })
    expect(data?.page_size).toBe(40)
    expect(data?.item_page_size).toBe(12)
  })

  test("names properties the way the pages carry them", () => {
    const data = viewDataOfPage(tasksToday)
    expect(data?.visible_properties).toEqual(["priority", "dueDate", "valueSlug"])
  })
})

describe("viewDataOfPage, on a view that stands in a row", () => {
  test("reads the config blob", () => {
    const data = viewDataOfPage({
      config: { version: 1, layout: "table", pageTypeId: "ROW-ID", filters: [] },
    })
    expect(data?.layout).toBe("table")
    expect(data?.pageTypeId).toBe("ROW-ID")
  })

  test("is not mistaken for a file", () => {
    expect(isFileSpelledView({ config: {} })).toBe(false)
    expect(isFileSpelledView(tasksToday)).toBe(true)
  })

  test("answers nothing where a page carries neither spelling", () => {
    expect(viewDataOfPage({ title: "bare" })).toBeUndefined()
    expect(viewDataOfPage(undefined)).toBeUndefined()
  })
})
