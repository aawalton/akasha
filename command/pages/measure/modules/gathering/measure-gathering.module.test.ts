import { afterAll, expect, test } from "bun:test"
import {
  agoOf,
  DAY,
  DAY_BACK,
  HOUR,
  LAST_RUN,
  lineOf,
  NOW,
  ONE,
  TWO,
} from "akasha/check/modules/measuring/check-measuring.module.test-fixtures.ts"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import {
  besideIn,
  costsOf,
  readIn,
} from "akasha/command/pages/measure/modules/gathering/measure-gathering.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const PAGE = "temper/held-addon/held-addon.eso-addon.ts"

const FIRST = "temper/held-addon/held-addon.eso-addon.entries.uncommitted.jsonl"

const SECOND = "temper/held-addon/held-addon.eso-addon.entries.part2.uncommitted.jsonl"

const NOT_JSON = "{not json"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const rootHolding = (held: Readonly<Record<string, string>>): string => {
  const root = scratch.rootFor("measure-gathering-")
  for (const [at, body] of Object.entries(held)) put(root, at, body)
  return root
}

const rowOf = (one: Record<string, unknown>): string => lineOf({ phase: "test", ...one })

const linesOfRows = (rows: readonly Record<string, unknown>[]): string =>
  `${rows.map(rowOf).join("\n")}\n`

test("every numbered file beside a page is read rather than the first alone", () => {
  const root = rootHolding({
    [FIRST]: linesOfRows([{ ran: "first-ran" }]),
    [SECOND]: linesOfRows([{ runId: TWO, ran: "second-ran" }]),
  })
  const found = besideIn(root, [PAGE])

  expect([...found.runs.map((one) => one.ran)].sort()).toEqual(["first-ran", "second-ran"])
})

test("a file beside a page that is not there is no file to read", () => {
  const found = besideIn(rootHolding({}), [PAGE])

  expect(found.runs.length).toBe(0)
  expect(found.unread.length).toBe(0)
})

test("a file that would not read is named rather than counting as no runs", () => {
  const found = besideIn(rootHolding({ [`${FIRST}/inner`]: "" }), [PAGE])

  expect(found.runs.length).toBe(0)
  expect(found.unread).toEqual([FIRST])
})

test("a row that would not read is passed over and the rest of that file read", () => {
  const root = rootHolding({ [FIRST]: `${linesOfRows([{ ran: "held-ran" }])}${NOT_JSON}\n` })
  const found = readIn(root, [FIRST])

  expect(found.runs.length).toBe(1)
  expect(found.torn).toEqual([FIRST])
})

test("which rows count as runs is answered by the caller", () => {
  const root = rootHolding({
    [FIRST]: linesOfRows([{ ran: "kept-ran" }, { runId: TWO, phase: "deploy", ran: "left-ran" }]),
  })
  const costs = costsOf(readIn(root, [FIRST]), NOW, DAY_BACK, (one) => one.phase === "test")

  expect(costs.checks.map((one) => one.check)).toEqual(["kept-ran"])
})

test("a row stamped before the window opens counts nowhere", () => {
  const root = rootHolding({
    [FIRST]: linesOfRows([
      { ran: "fresh-ran" },
      { runId: TWO, ran: "stale-ran", ranAt: agoOf(DAY + HOUR) },
    ]),
  })
  const costs = costsOf(readIn(root, [FIRST]), NOW, DAY_BACK, () => true)

  expect(costs.checks.map((one) => one.check)).toEqual(["fresh-ran"])
})

test("the runs are gathered under what the row says ran", () => {
  const root = rootHolding({
    [FIRST]: linesOfRows([
      { ran: "one-ran", cpuSeconds: 4 },
      { ran: "one-ran", cpuSeconds: 2 },
      { runId: TWO, ran: "two-ran", cpuSeconds: 1 },
    ]),
  })
  const costs = costsOf(readIn(root, [FIRST]), NOW, DAY_BACK, () => true)

  expect(costs.checks.map((one) => [one.check, one.runs, one.cpu])).toEqual([
    ["one-ran", 2, 3],
    ["two-ran", 1, 1],
  ])
})

test("a window of runs counts the most recent run ids rather than the most recent rows", () => {
  const root = rootHolding({
    [FIRST]: linesOfRows([
      { runId: ONE, ran: "older-ran", ranAt: agoOf(2 * HOUR) },
      { runId: TWO, ran: "newer-ran" },
    ]),
  })
  const costs = costsOf(readIn(root, [FIRST]), NOW, LAST_RUN, () => true)

  expect(costs.checks.map((one) => one.check)).toEqual(["newer-ran"])
})
