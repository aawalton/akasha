import { expect, test } from "bun:test"
import {
  added,
  settled,
} from "akasha/story/world/pages/mana-devourer-litrpgmana-cultivation/stories/played/otherwhere-ix/mechanics/checks/otherwhere-ix-standing.world-check.settling.code.ts"

const BESSA = "otherwhere-ix-nala-and-bessa-hobb"

test("marks add up, each giving its grounds", () => {
  expect(
    settled({
      character: BESSA,
      word: 1,
      respect: 0,
      aid: 2,
      fairness: 1,
      wronged: 0,
      grounds: { word: "she came back", aid: "she scrubbed pots", fairness: "she paid in full" },
    })
  ).toEqual({ answered: { earned: 4, lost: 0, change: 4 } })
})

test("each wrong costs three", () => {
  expect(
    settled({
      character: BESSA,
      word: 0,
      respect: 1,
      aid: 0,
      fairness: 0,
      wronged: 1,
      grounds: { respect: "she listened", wronged: "she took bread unasked" },
    })
  ).toEqual({ answered: { earned: 1, lost: 3, change: -2 } })
})

test("a mark with no grounds is refused", () => {
  expect(
    settled({
      character: BESSA,
      word: 2,
      respect: 0,
      aid: 0,
      fairness: 0,
      wronged: 0,
      grounds: {},
    })
  ).toHaveProperty("refused")
})

test("a mark past two is refused", () => {
  expect(
    settled({
      character: BESSA,
      word: 0,
      respect: 0,
      aid: 3,
      fairness: 0,
      wronged: 0,
      grounds: { aid: "she hauled water" },
    })
  ).toHaveProperty("refused")
})

test("a change adds its points to the relationship page", () => {
  const reading = {
    character: BESSA,
    word: 0,
    respect: 1,
    aid: 1,
    fairness: 0,
    wronged: 0,
    grounds: { respect: "she thanked her", aid: "she swept" },
  }
  expect(added(reading, { earned: 2, lost: 0, change: 2 })).toEqual([
    { page: `world-relationship/${BESSA}`, key: "relationshipPoints", by: 2 },
  ])
})

test("no change adds nothing", () => {
  const reading = {
    character: BESSA,
    word: 0,
    respect: 0,
    aid: 0,
    fairness: 0,
    wronged: 0,
    grounds: {},
  }
  expect(added(reading, { earned: 0, lost: 0, change: 0 })).toEqual([])
})
