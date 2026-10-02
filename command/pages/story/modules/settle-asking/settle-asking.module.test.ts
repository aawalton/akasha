import { expect, test } from "bun:test"
import { bodyIn, foldedIn } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { addedTo, ledgerAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  askedFor,
  countedLines,
  pageIn,
  summedFor,
} from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import { indexedRepo } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

const OUTCOMES = "turns/the-saga-00-002.story-turn-played.outcomes.jsonl"

const TURN = "turns/the-saga-00-002.story-turn-played.ts"

const TIMED = { answered: { endsAt: "2026-09-28T11:27:00.000Z", day: 1 } }

test("a roll answering no endsAt is appended to the outcomes and asks nothing of the turn", () => {
  const roll = { answered: { total: 7 } }
  const asked = askedFor(OUTCOMES, TURN, roll, null)
  expect(asked).toHaveLength(1)
  expect(asked[0]?.given).toEqual({ at: OUTCOMES, content: `${JSON.stringify(roll)}\n` })
})

test("a roll answering endsAt adds that instant to a turn stating none", () => {
  const asked = askedFor(OUTCOMES, TURN, TIMED, `  slug: "the-saga-00-002",\n`)
  expect(asked).toHaveLength(2)
  expect(asked[1]?.at).toMatch(/\/add-page-property$/)
  expect(asked[1]?.given).toEqual({ at: TURN, key: "endsAt", value: '"2026-09-28T11:27:00.000Z"' })
})

test("a roll answering endsAt restates the instant a turn states already", () => {
  const asked = askedFor(OUTCOMES, TURN, TIMED, `  endsAt: "2026-09-28T11:15:00.000Z",\n`)
  expect(asked).toHaveLength(2)
  expect(asked[1]?.at).toMatch(/\/change-page-page-property$/)
  expect(asked[1]?.given).toEqual({ at: TURN, key: "endsAt", to: "2026-09-28T11:27:00.000Z" })
})

test("a turn stating that instant already is asked nothing more", () => {
  const text = `  endsAt: "2026-09-28T11:27:00.000Z",\n`
  expect(askedFor(OUTCOMES, TURN, TIMED, text)).toHaveLength(1)
})

const HERS = "pages/her.world-relationship.ts"

const POINTS = "relationshipPoints"

test("what a page adds to is summed and restated once from the number it states", () => {
  const sums = [
    { at: HERS, key: POINTS, by: 3 },
    { at: HERS, key: POINTS, by: -1 },
  ]
  const asked = summedFor(sums, () => `  ${POINTS}: -2,\n`)
  expect(asked).toHaveLength(1)
  expect(asked[0]?.at).toMatch(/\/change-page-page-property$/)
  expect(asked[0]?.given).toEqual({ at: HERS, key: POINTS, to: "0", holds: "number" })
})

test("a page stating no number there gains what is added as that key", () => {
  const asked = summedFor([{ at: HERS, key: POINTS, by: 3 }], () => "")
  expect(asked[0]?.at).toMatch(/\/add-page-property$/)
  expect(asked[0]?.given).toEqual({ at: HERS, key: POINTS, value: "3" })
})

const KEPT_AT = "akasha/kept/fresh.module.ts"

const KEPT_PAGE = `export const fresh = {
  id: "01a04a4a-0000-7000-8000-0000000000ff",
  type: "page-type/module",
  slug: "fresh",
  definition: "a page only kept edits hold",
  ${POINTS}: 2,
} as const
`

test("a page only in kept edits is found, and its number read, as those edits leave the tree", () => {
  const root = indexedRepo()
  expect(pageIn(ledgerAt(root, bodyIn(root)).index, "module/fresh")).toBeNull()
  const kept = addedTo(
    ledgerAt(root, bodyIn(root)),
    foldedIn([{ kind: "add", path: KEPT_AT, content: KEPT_PAGE }])
  )
  const at = pageIn(kept.index, "module/fresh")
  expect(at).toBe(KEPT_AT)
  const asked = summedFor([{ at: at ?? "", key: POINTS, by: 3 }], kept.textOf)
  expect(asked[0]?.given).toEqual({ at: KEPT_AT, key: POINTS, to: "5", holds: "number" })
})

test("nothing added asks nothing", () => {
  expect(summedFor([{ at: HERS, key: POINTS, by: 0 }], () => "")).toEqual([])
})

function lineOf(answered: number, more: Record<string, unknown> = {}): string {
  const reading = { character: "her" }
  return JSON.stringify({ check: "world-check/timed", reading, answered, ...more })
}

test("a later line of a check rolling nothing replaces its earlier line, and a roll replaces none", () => {
  const rolled = lineOf(9, { dice: { said: "1d6" } })
  const other = JSON.stringify({ check: "world-check/timed", reading: { character: "him" } })
  const kept = [lineOf(1), rolled, other, lineOf(2), rolled, ""].join("\n")
  expect(countedLines(kept)).toEqual([rolled, other, lineOf(2), rolled])
})
