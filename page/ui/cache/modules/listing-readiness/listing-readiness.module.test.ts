import { expect, test } from "bun:test"
import {
  createAnsweredListings,
  createHeldSnapshots,
  listingLoading,
} from "akasha/page/ui/cache/modules/listing-readiness/listing-readiness.module.code.ts"

test("a listing counts as answered only once its own question was answered", () => {
  const answered = createAnsweredListings()
  expect(answered.has("temper-skill")).toBe(false)
  answered.answer("temper-scribed-skill")
  expect(answered.has("temper-skill")).toBe(false)
  answered.answer("temper-skill")
  expect(answered.has("temper-skill")).toBe(true)
})

test("a listing whose own question went unanswered is loading whatever rows the store holds", () => {
  expect(listingLoading({ rows: [{ id: "held-by-another-reader" }] }, false)).toBe(true)
  expect(listingLoading(null, true)).toBe(true)
  expect(listingLoading({ rows: [] }, true)).toBe(false)
})

test("a listing asked again is shown with the rows it last held", () => {
  const held = createHeldSnapshots<readonly string[]>(2)
  held.hold("skills", ["acid-spray"])
  expect(held.get("skills")).toEqual(["acid-spray"])
})

test("held rows are kept for the listings read most lately", () => {
  const held = createHeldSnapshots<number>(2)
  held.hold("one", 1)
  held.hold("two", 2)
  held.hold("one", 11)
  held.hold("three", 3)
  expect(held.get("two")).toBeUndefined()
  expect(held.get("one")).toBe(11)
  expect(held.get("three")).toBe(3)
})
