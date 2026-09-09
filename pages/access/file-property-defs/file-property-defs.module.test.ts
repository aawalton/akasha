import { expect, test } from "bun:test"
import { renderedType } from "./file-property-defs.module.code.ts"

const DRAWN = [
  "text",
  "markdown",
  "number",
  "select",
  "multi-select",
  "path-select",
  "calendar-date",
  "calendar-time",
  "instant",
  "boolean",
  "url",
  "relation",
  "multi-relation",
  "rollup",
  "aggregate",
  "formula",
  "json",
  "rrule",
  "progress",
  "rich-document",
  "action-button",
]

const DECLARERS = [
  "boolean-property",
  "calendar-date-property",
  "calendar-time-property",
  "computed-property",
  "email-address-property",
  "file-property",
  "instant-property",
  "number-property",
  "one-of-property",
  "page-property",
  "page-property-entry",
  "phone-number-property",
  "process-property",
  "rank-property",
  "record-property",
  "relation-property",
  "select-property",
  "text-property",
  "url-property",
]

test("every property page type renders as a type a screen draws", () => {
  for (const declarer of DECLARERS) {
    expect(DRAWN).toContain(renderedType(declarer))
  }
})

test("a computed property renders as text rather than as computed", () => {
  expect(renderedType("computed-property")).toBe("text")
})

test("a property page type named nowhere renders as text", () => {
  expect(renderedType("sundial-property")).toBe("text")
})

test("a type a screen already draws is left as that type", () => {
  expect(renderedType("markdown")).toBe("markdown")
  expect(renderedType("rich-document")).toBe("rich-document")
})
