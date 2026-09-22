import { expect, test } from "bun:test"
import { propertyCarried } from "akasha/page/core/schema/modules/property-carried/property-carried.module.code.ts"

const DAY = [{ id: "date" }, { id: "lastViewedAt" }, { id: "title" }]

const STORY_PLAYED = [{ id: "title" }, { id: "prose" }, { id: "world" }]

test("a page type stating the key carries that property", () => {
  expect(propertyCarried(DAY, "lastViewedAt")).toBe(true)
})

test("a page type stating no such key carries no such property", () => {
  expect(propertyCarried(STORY_PLAYED, "lastViewedAt")).toBe(false)
})

test("a page type stating nothing carries no property", () => {
  expect(propertyCarried([], "lastViewedAt")).toBe(false)
})

test("a key is read whole rather than as a beginning", () => {
  expect(propertyCarried(DAY, "lastViewed")).toBe(false)
})
