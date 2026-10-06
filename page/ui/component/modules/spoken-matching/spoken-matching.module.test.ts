import { describe, expect, test } from "bun:test"
import {
  foundIn,
  keyOf,
  spokenKeys,
} from "akasha/page/ui/component/modules/spoken-matching/spoken-matching.module.code.ts"

const PROSE = "**The Tower**\nShe ran. *Really* ran!\n“Stop,” he said. She ran."

describe("spokenKeys", () => {
  test("a sentence's words are its letters and digits, without marks or case", () => {
    expect(spokenKeys(PROSE, 4, 6)).toEqual(["really", "ran"])
    expect(keyOf("“Stop,”")).toBe("stop")
  })

  test("a sentence with no end marked runs to the first word ending a sentence", () => {
    expect(spokenKeys(PROSE, 6, null)).toEqual(["stop", "he", "said"])
  })
})

describe("foundIn", () => {
  const keys = ["the", "tower", "she", "ran", "really", "ran", "stop", "he", "said", "she", "ran"]

  test("a sentence is found where its first words are, and ends at its last", () => {
    expect(foundIn(keys, ["stop", "he", "said"], 6)).toEqual({ first: 6, last: 8 })
  })

  test("a sentence whose first words come twice is the one nearest its place", () => {
    expect(foundIn(keys, ["she", "ran"], 9)).toEqual({ first: 9, last: 10 })
    expect(foundIn(keys, ["she", "ran"], 1)).toEqual({ first: 2, last: 3 })
  })

  test("a sentence drawn otherwise is found by fewer of its first words", () => {
    expect(foundIn(keys, ["stop", "he", "shouted"], 6)).toEqual({ first: 6, last: 8 })
  })

  test("a sentence the screen does not show is found nowhere", () => {
    expect(foundIn(keys, ["nowhere", "here"], 0)).toBeNull()
  })
})
