import { expect, test } from "bun:test"
import { ownedRefused } from "akasha/page/service/modules/owned-puts/owned-puts.module.code.ts"
import { ROOT } from "akasha/page/service/modules/page-composing/page-composing.module.test-fixtures.ts"

const HELD = "akasha/figure/pages/held-figure/held-figure.figure"

const TALLIES = `${HELD}.tallies.jsonl`

const TALLIES_TWO = `${HELD}.tallies.part2.jsonl`

test("a put under an entry naming what alone writes it is refused, naming that writer", () => {
  expect(ownedRefused(ROOT, [TALLIES], null)).toContain("`tally-landing`")
})

test("every part of that entry is judged, not only the first", () => {
  expect(ownedRefused(ROOT, [`${HELD}.rounds.jsonl`, TALLIES_TWO], null)).toContain("`tallies`")
})

test("a write naming another module is refused the same way", () => {
  expect(ownedRefused(ROOT, [TALLIES], "other-landing")).toContain("`tally-landing`")
})

test("a write naming the module the entry names is let through", () => {
  expect(ownedRefused(ROOT, [TALLIES, TALLIES_TWO], "tally-landing")).toBeNull()
})

test("a put under an entry naming no writer is let through", () => {
  expect(ownedRefused(ROOT, [`${HELD}.rounds.jsonl`], null)).toBeNull()
})

test("a path that is no part of a page is let through", () => {
  expect(ownedRefused(ROOT, ["akasha/notes.txt", `${HELD}.ts`], null)).toBeNull()
})
