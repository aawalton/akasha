import { expect, test } from "bun:test"
import {
  answeredAll,
  createAnsweredListings,
  createHeldSnapshots,
} from "akasha/page/ui/cache/modules/listing-readiness/listing-readiness.module.code.ts"

test("a set of questions counts as answered only once every one of them was answered", () => {
  const answered = createAnsweredListings()
  expect(answeredAll(answered, [])).toBe(true)
  answered.answer("temper-skill:slug:acid-spray")
  expect(answeredAll(answered, ["temper-skill:slug:acid-spray", "temper-set:id:one"])).toBe(false)
  answered.answer("temper-set:id:one")
  expect(answeredAll(answered, ["temper-skill:slug:acid-spray", "temper-set:id:one"])).toBe(true)
})

test("a listing counts as answered only once its own question was answered", () => {
  const answered = createAnsweredListings()
  expect(answered.has("temper-skill")).toBe(false)
  answered.answer("temper-scribed-skill")
  expect(answered.has("temper-skill")).toBe(false)
  answered.answer("temper-skill")
  expect(answered.has("temper-skill")).toBe(true)
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
