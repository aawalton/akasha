import { expect, test } from "bun:test"
import {
  type BeatChange,
  cachedOf,
  changesIn,
  changesRefused,
  type Reading,
} from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"

const XP = "metric-character/elsie-xp"

const DRAUGHT = "story-item/healing-draught"

const PAGES: Readonly<Record<string, Readonly<Record<string, unknown>>>> = {
  [XP]: { value: 120, history: [{ turn: 3, value: 120 }] },
  [DRAUGHT]: { quantity: 1, character: "character-player/elsie" },
}

const READING: Reading = {
  exists: (page) => page in PAGES,
  valueOf: (page, key) => PAGES[page]?.[key],
}

function changesOf(records: readonly Record<string, unknown>[], beats = 5): readonly BeatChange[] {
  const said = changesIn(
    records.map((one) => JSON.stringify(one)),
    beats
  )
  if ("refused" in said) throw new Error(said.refused)
  return said
}

const GAIN = {
  beat: 2,
  page: XP,
  key: "value",
  from: 120,
  to: 160,
  note: "Elsie gains 40 XP (120 → 160)",
}

const LOGGED = {
  beat: 2,
  page: XP,
  key: "history",
  append: { turn: 4, value: 160 },
  note: "XP logged",
}

test("changes are json lines naming a beat, a page, a note and one act", () => {
  expect(changesOf([GAIN])).toEqual([GAIN])
  const twice = { ...GAIN, append: 1 }
  expect(changesIn([JSON.stringify(twice)], 5)).toEqual({
    refused: "change 1 states one of `to`, `append` or `make`, and only one",
  })
  expect(changesIn([JSON.stringify({ ...GAIN, beat: 9 })], 5)).toEqual({
    refused: "change 1 names no beat from 1 to 5",
  })
  expect(changesIn(["nope"], 5)).toEqual({ refused: "change 1 is no json object" })
  const late = [JSON.stringify({ ...GAIN, beat: 3 }), JSON.stringify(GAIN)]
  expect(changesIn(late, 5)).toEqual({ refused: "change 2 comes before beat 3's changes" })
})

test("a change from a value the page does not hold is refused, naming both", () => {
  const stale = changesOf([{ ...GAIN, from: 100 }])
  expect(changesRefused(stale, READING)).toContain("was 100, and it is 120")
  expect(changesRefused(changesOf([GAIN]), READING)).toBeNull()
})

test("spending what is not held, or leaving less than none, is refused", () => {
  const use = { beat: 1, page: DRAUGHT, key: "quantity", from: 1, to: 0, note: "Draught used" }
  const again = { ...use, beat: 3 }
  expect(changesRefused(changesOf([use, again]), READING)).toContain("was 1, and it is 0")
  const below = { ...use, to: -1 }
  expect(changesRefused(changesOf([below]), READING)).toContain("nothing is held below none")
})

test("a page no one filed is refused unless a change made it first", () => {
  const purse = "metric-character-currency/elsie-silver"
  const set = { beat: 1, page: purse, key: "value", from: 0, to: 5, note: "Elsie finds 5 silver" }
  expect(changesRefused(changesOf([set]), READING)).toContain("no page is that")
  const made = { beat: 1, page: purse, make: { value: 0 }, note: "Elsie opens a purse" }
  expect(changesRefused(changesOf([made, set]), READING)).toBeNull()
  expect(changesRefused(changesOf([{ ...made, page: XP }]), READING)).toContain("there already")
})

test("the cache is each page's values once the changes are applied, history appended", () => {
  const cached = cachedOf(changesOf([GAIN, LOGGED]), READING)
  expect(cached).toEqual([
    {
      page: XP,
      values: {
        value: 160,
        history: [
          { turn: 3, value: 120 },
          { turn: 4, value: 160 },
        ],
      },
      made: false,
    },
  ])
})

test("the cache applies a change whose page moved on since, rather than refusing a finished turn", () => {
  const moved: Reading = {
    ...READING,
    valueOf: (page, key) => (key === "value" ? 130 : READING.valueOf(page, key)),
  }
  expect(cachedOf(changesOf([GAIN]), moved)).toEqual([
    { page: XP, values: { value: 160 }, made: false },
  ])
})
