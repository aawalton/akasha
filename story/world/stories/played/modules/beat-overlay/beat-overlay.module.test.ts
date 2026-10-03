import { expect, test } from "bun:test"
import type { QueryRow } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import {
  type BeatOverlay,
  NO_OVERLAY,
  overlaidRow,
  overlaidRows,
} from "akasha/story/world/stories/played/modules/beat-overlay/beat-overlay.module.code.ts"

const ROW: QueryRow = { values: { slug: "elsie-xp", value: 160 } }

function overlayOf(): BeatOverlay {
  const mine = (page: string): boolean => page.endsWith("elsie-xp") || page.endsWith("elsie-purse")
  return {
    knows: mine,
    shows: (page) => !page.endsWith("elsie-purse"),
    keysOf: (page) => (page.endsWith("elsie-xp") ? ["value"] : []),
    valueOf: (_page, _key, current) => Number(current) - 40,
  }
}

test("a row's changed keys are drawn as of the beat, and its other keys are left", () => {
  const one = overlaidRow(ROW, "metric-character", overlayOf())
  expect(one?.values).toEqual({ slug: "elsie-xp", value: 120 })
})

test("a page the beats have not made yet is drawn nowhere", () => {
  const purse: QueryRow = { values: { slug: "elsie-purse", value: 3 } }
  expect(overlaidRow(purse, "metric-character-currency", overlayOf())).toBeNull()
})

test("a row is found by the page type the row states, beneath the type asked for", () => {
  const row: QueryRow = { values: { slug: "pearl", type: "the-beholder-allure", value: 15.6 } }
  const named: BeatOverlay = {
    knows: (page) => page === "the-beholder-allure/pearl",
    shows: () => true,
    keysOf: () => ["value"],
    valueOf: () => 14,
  }
  expect(overlaidRow(row, "metric-character-attribute", named)?.values["value"]).toBe(14)
})

test("a row of another type sharing a slug is left as the page holds it", () => {
  const level: QueryRow = { values: { slug: "wren", type: "metric-character-level", value: 6 } }
  const named: BeatOverlay = {
    knows: (page) => page === "metric-character-experience/wren",
    shows: () => true,
    keysOf: () => ["value"],
    valueOf: () => 2211,
  }
  expect(overlaidRow(level, "metric-character-resource", named)).toEqual(level)
})

test("no overlay leaves every row as the pages hold it", () => {
  expect(overlaidRow(ROW, "metric-character", NO_OVERLAY)).toEqual(ROW)
  expect(overlaidRows([ROW], "metric-character", NO_OVERLAY)).toEqual([ROW])
})
