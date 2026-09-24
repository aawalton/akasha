import { expect, test } from "bun:test"
import {
  definitionOf,
  renderedType,
} from "akasha/page/access/modules/file-property-defs/file-property-defs.module.code.ts"
import type { Declared } from "akasha/page/service/modules/page-shaping/page-shaping.module.code.ts"

const WORKED: Declared = {
  key: "worked-tint",
  type: "computed-property",
  drawnBy: ["computed-property", "page-property"],
  memberDrawnBy: [],
  fields: [],
  title: "Worked Tint",
  pageId: "",
  on: "held",
  values: null,
  optionColors: null,
  targetSlug: null,
  slugProperty: "worked-tint",
  mayBeGone: true,
  verbId: null,
  colorsTitle: false,
  icon: "sigma",
}

const DRAWN = [
  "text",
  "markdown",
  "number",
  "select",
  "multi-select",
  "calendar-date",
  "calendar-time",
  "instant",
  "boolean",
  "url",
  "relation",
  "multi-relation",

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
  "grade-property",
  "instant-property",
  "markdown-property",
  "multi-relation-property",
  "multi-select-property",
  "number-property",
  "one-of-property",
  "page-property",
  "page-property-entry",
  "phone-number-property",
  "process-property",
  "record-property",
  "relation-property",
  "rrule-property",
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

test("a computed property naming a page type to reach is drawn as a relation is", () => {
  const drawn = definitionOf({ ...WORKED, targetSlug: "tint" })
  expect(drawn.type).toBe("relation")
  expect(drawn.drawnBy).toEqual(["relation-property", "computed-property", "page-property"])
  expect(drawn.config).toEqual({ targetPageTypeSlug: "tint" })
})

test("a computed property naming no page type to reach is drawn as its own chain draws it", () => {
  const drawn = definitionOf(WORKED)
  expect(drawn.type).toBe("text")
  expect(drawn.drawnBy).toEqual(["computed-property", "page-property"])
})

test("a property its page type names to color titles is said to color them", () => {
  expect(definitionOf({ ...WORKED, colorsTitle: true }).colorsTitle).toBe(true)
})

test("a computed property reaching a page type keeps its own kind's icon", () => {
  expect(definitionOf({ ...WORKED, targetSlug: "tint" }).icon).toBe("sigma")
})

test("a declaration naming no icon gives a definition with none", () => {
  expect(definitionOf({ ...WORKED, icon: null })).not.toHaveProperty("icon")
})

test("a property its page type names nowhere says nothing of titles", () => {
  expect(definitionOf(WORKED)).not.toHaveProperty("colorsTitle")
})
