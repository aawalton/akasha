import { expect, test } from "bun:test"
import { intelligenceIn, TOPICS_TO_THE_POINT } from "./intelligence.attribute.code.ts"

const held = (figure: unknown) => ({ "intelligence-topics": figure })

test("the points are the figure over the amount one point costs", () => {
  expect(TOPICS_TO_THE_POINT).toBe(4)
  expect(intelligenceIn(held(4))).toBeCloseTo(1, 10)
  expect(intelligenceIn(held(8))).toBeCloseTo(2, 10)
})

test("the rungs Alan set fall where his topic counts fall", () => {
  expect(intelligenceIn(held(1))).toBeCloseTo(0.25, 10)
  expect(intelligenceIn(held(2))).toBeCloseTo(0.5, 10)
})

test("a figure given as text is read as the number that text spells", () => {
  expect(intelligenceIn(held(String(4)))).toBeCloseTo(1, 10)
})

test("points of zero are points rather than absent ones", () => {
  expect(intelligenceIn(held(0))).toBe(0)
  expect(intelligenceIn(held("0"))).toBe(0)
})

test("a day carrying no figure earns nothing rather than an intelligence of zero", () => {
  expect(intelligenceIn({})).toBeNull()
  expect(intelligenceIn(held(null))).toBeNull()
  expect(intelligenceIn(held(undefined))).toBeNull()
  expect(intelligenceIn(held(""))).toBeNull()
  expect(intelligenceIn(held("   "))).toBeNull()
  expect(intelligenceIn(held("soon"))).toBeNull()
})
