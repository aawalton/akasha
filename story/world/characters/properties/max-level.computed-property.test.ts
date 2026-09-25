import { expect, test } from "bun:test"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"
import {
  highestLevel,
  work,
} from "akasha/story/world/characters/properties/max-level.computed-property.code.ts"

const REACH = {
  target: () => null,
  through: () => null,
  naming: () => [],
  file: () => null,
  folder: () => null,
} as Reach

const asserted = (claimValue: string) => ({
  claimField: "level",
  claimValue,
  epistemic: "asserted",
})

test("the highest level is the highest the story asserts", () => {
  expect(highestLevel([asserted("18"), asserted("40"), asserted("34")])).toBe(40)
})

test("a level a character says is passed over", () => {
  const said = { claimField: "level", claimValue: "75", epistemic: "claimed", claimedBy: "Osthia" }

  expect(highestLevel([asserted("20"), said])).toBe(20)
})

test("a character only said to have a level has no highest level", () => {
  expect(highestLevel([{ claimField: "level", claimValue: "26", epistemic: "claimed" }])).toBeNull()
})

test("a claim about anything but a level is passed over", () => {
  expect(
    highestLevel([{ claimField: "class", claimValue: "90", epistemic: "asserted" }])
  ).toBeNull()
})

test("a level that is no number is passed over", () => {
  expect(highestLevel([asserted("forty"), asserted(""), asserted("12")])).toBe(12)
})

test("a character with no claims has no highest level", () => {
  expect(highestLevel([])).toBeNull()
})

test("the claims beside a character are worked into its highest level", () => {
  expect(work({ characterClaims: [asserted("3"), asserted("55")] }, REACH)).toBe(55)
})

test("a character whose claims are unread has no highest level", () => {
  expect(work({ characterClaims: "jsonl" }, REACH)).toBeNull()
})

test("a character carrying no claims has no highest level", () => {
  expect(work({}, REACH)).toBeNull()
})
