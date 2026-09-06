import { expect, test } from "bun:test"
import { isFileSpelledView, viewDataOfPage } from "./view-data-of-page.module.code.ts"

const TASKS_TODAY = {
  title: "Today",
  navSlug: "tasks",
  viewPlace: 0,
  layout: "cards",
  pageType: "to-do",
  narrows: [{ key: "due-date", comparison: "before", values: ["eso-day-next"] }],
  viewSorts: [
    { key: "priority", descending: false },
    { key: "title", descending: true },
  ],
  visibleProperties: ["due-date", "priority"],
}

test("a view carrying its nav item alone is read from its file", () => {
  expect(isFileSpelledView({ navSlug: "tasks", title: "Tasks", viewPlace: 0 })).toBe(true)
})

test("a view whose settings the browser wrote is not read from its file", () => {
  expect(isFileSpelledView({ config: { version: 1 } })).toBe(false)
})

test("a view names the page type its pages are of", () => {
  const data = viewDataOfPage(TASKS_TODAY, (slug) =>
    slug === "to-do" ? "the-to-do-id" : undefined
  )
  expect(data?.pageTypeSlug).toBe("to-do")
  expect(data?.pageTypeId).toBe("the-to-do-id")
})

test("a narrow becomes the filter that narrow names", () => {
  const data = viewDataOfPage(TASKS_TODAY)
  expect(data?.filters).toEqual([
    { propertyId: "dueDate", operator: "lte", value: { sentinel: "today" } },
  ])
})

test("a narrow over many values keeps every value", () => {
  const data = viewDataOfPage({
    navSlug: "anime-and-shows",
    narrows: [{ key: "status", comparison: "in", values: ["In Progress", "Following"] }],
  })
  expect(data?.filters).toEqual([
    { propertyId: "status", operator: "includes", value: ["In Progress", "Following"] },
  ])
})

test("a narrow over one value takes that value rather than the list holding it", () => {
  const data = viewDataOfPage({
    navSlug: "stories",
    narrows: [{ key: "partOf", comparison: "is", values: ["the-wandering-inn"] }],
  })
  expect(data?.filters).toEqual([
    { propertyId: "partOf", operator: "equals", value: "the-wandering-inn" },
  ])
})

test("a narrow on emptiness carries no value", () => {
  const data = viewDataOfPage({
    navSlug: "tasks",
    narrows: [{ key: "completed-at", comparison: "empty", values: ["true"] }],
  })
  expect(data?.filters).toEqual([{ propertyId: "completedAt", operator: "is_empty" }])
})

test("a view's sorts keep their order and their direction", () => {
  const data = viewDataOfPage(TASKS_TODAY)
  expect(data?.sorts).toEqual([
    { field: "priority", direction: "asc" },
    { field: "title", direction: "desc" },
  ])
})

test("a cross-type view is read by the predicate it names", () => {
  const data = viewDataOfPage({ navSlug: "home", viewPredicate: "favorites" })
  expect(data?.crossTypeSource).toEqual({ predicateKey: "favorites" })
})

test("a key written in kebab is read as the key a page carries", () => {
  const data = viewDataOfPage(TASKS_TODAY)
  expect(data?.visible_properties).toEqual(["dueDate", "priority"])
})
