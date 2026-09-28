import { expect, test } from "bun:test"
import {
  added,
  settled,
} from "akasha/story/world/pages/god-of-trash/stories/played/otherwhere-vii/mechanics/checks/otherwhere-vii-standing.world-check.settling.code.ts"

const WITH_ENNIS = {
  character: "otherwhere-vii-ennis",
  kept: 1,
  heard: 2,
  shared: 0,
  gave: 0,
  crossed: 0,
  quotes: { kept: "she paid what she said", heard: "let him finish his price" },
}

test("the four marks add up to the regard earned", () => {
  expect(settled(WITH_ENNIS)).toEqual({ answered: { earned: 3, lost: 0, change: 3 } })
})

test("each crossed line costs three", () => {
  const insulted = { ...WITH_ENNIS, crossed: 1, quotes: { ...WITH_ENNIS.quotes, crossed: "thief" } }
  expect(settled(insulted)).toEqual({ answered: { earned: 3, lost: 3, change: 0 } })
})

test("a mark above nought with no words is refused", () => {
  expect(settled({ ...WITH_ENNIS, gave: 1 })).toHaveProperty("refused")
})

test("a mark above two is refused", () => {
  expect(settled({ ...WITH_ENNIS, heard: 3 })).toHaveProperty("refused")
})

test("the change is added to the relationship page's points", () => {
  expect(added(WITH_ENNIS, { earned: 3, lost: 0, change: 3 })).toEqual([
    { page: "world-relationship/otherwhere-vii-ennis", key: "relationshipPoints", by: 3 },
  ])
})

test("a turn that moved nothing adds nothing", () => {
  const still = { ...WITH_ENNIS, kept: 0, heard: 0, quotes: {} }
  expect(added(still, { earned: 0, lost: 0, change: 0 })).toEqual([])
})
