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
  return {
    shows: (page) => page !== "metric-character-currency/elsie-purse",
    keysOf: (page) => (page === "metric-character/elsie-xp" ? ["value"] : []),
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

test("no overlay leaves every row as the pages hold it", () => {
  expect(overlaidRow(ROW, "metric-character", NO_OVERLAY)).toEqual(ROW)
  expect(overlaidRows([ROW], "metric-character", NO_OVERLAY)).toEqual([ROW])
})
