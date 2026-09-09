import { afterAll, expect, test } from "bun:test"
import { put } from "@akasha/testing-system/putting"
import { scratchWorld } from "../../../../../command-system/scratching/scratching.module.code.ts"
import {
  linesOf,
  partsIn,
  windowIn,
} from "../../checks/check-measuring/check-measuring.module.code.ts"
import {
  agoOf,
  DAY,
  HOUR,
  NOW,
  spacedOnce,
} from "../../checks/check-measuring/check-measuring.module.test-fixtures.ts"
import { costsIn, heldIn } from "./change-measuring.module.code.ts"
import {
  APPLY_AT,
  CHANGE_AT,
  ONE,
  partAt,
  rowsInto,
  THREE,
  TWO,
} from "./change-measuring.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const LAST_ONE = { by: "runs", runs: 1 } as const

const LAST_NINE = { by: "runs", runs: 9 } as const

const DAY_BACK = { by: "period", ms: DAY, said: "24h" } as const

function rootFor(): string {
  return scratch.rootFor("change-measuring-")
}

test("the rows are read from beside the page of the command that wrote them", () => {
  const root = rowsInto(rootFor(), CHANGE_AT, [{ cpuSeconds: 2 }])

  expect(costsIn(root, NOW, DAY_BACK).checks.map((one) => one.check)).toEqual(["change-file"])
})

test("the change page and the apply page are both read", () => {
  const root = rootFor()
  rowsInto(root, CHANGE_AT, [{ runId: ONE, ran: "change-file" }])
  rowsInto(root, APPLY_AT, [{ runId: TWO, phase: "apply", ran: "apply" }])

  expect(
    costsIn(root, NOW, DAY_BACK)
      .checks.map((one) => one.check)
      .sort()
  ).toEqual(["apply", "change-file"])
})

test("every numbered file of a page's rows is read rather than the first alone", () => {
  const root = rootFor()
  rowsInto(root, CHANGE_AT, [{ runId: ONE }], 1)
  rowsInto(root, CHANGE_AT, [{ runId: TWO }], 2)
  rowsInto(root, CHANGE_AT, [{ runId: THREE }], 3)

  expect(partsIn(root, `${CHANGE_AT}.ts`).length).toBe(3)
  expect(heldIn(root).runs.length).toBe(3)
})

test("a numbered file that is not there is no file left unread", () => {
  const root = rowsInto(rootFor(), CHANGE_AT, [{}])

  expect(heldIn(root).unread).toEqual([])
})

test("a file that would not read is named rather than counting as no runs", () => {
  const root = rootFor()
  put(root, `${partAt(CHANGE_AT, 1)}/inner`, "")

  const reading = heldIn(root)

  expect(reading.runs).toEqual([])
  expect(reading.unread).toEqual([partAt(CHANGE_AT, 1)])
})

test("a row a write left half appended leaves the file it is in unread", () => {
  const root = rootFor()
  put(root, partAt(CHANGE_AT, 1), '{"runId":"one","ranAt":"2026-09-05T11')

  expect(heldIn(root).unread).toEqual([partAt(CHANGE_AT, 1)])
})

test("the runs are gathered under what ran rather than under the page read", () => {
  const root = rowsInto(rootFor(), CHANGE_AT, [
    { runId: ONE, ran: "change-file" },
    { runId: TWO, ran: "add-file" },
  ])

  expect(
    costsIn(root, NOW, DAY_BACK)
      .checks.map((one) => one.check)
      .sort()
  ).toEqual(["add-file", "change-file"])
})

test("a window is chosen by the rule the check measuring chooses one by", () => {
  expect(windowIn(["--since", "24h"]).chosen).toBe(null)
  expect(windowIn(["--last", "3"]).chosen).toEqual({ by: "runs", runs: 3 })
  expect(windowIn(["--last", "24h"]).chosen).toEqual({ by: "period", ms: DAY, said: "24h" })
})

test("a count of runs names the most recent runs over both pages together", () => {
  const root = rootFor()
  rowsInto(root, CHANGE_AT, [{ runId: ONE, ranAt: agoOf(2 * HOUR), ran: "change-file" }])
  rowsInto(root, APPLY_AT, [{ runId: TWO, ranAt: agoOf(HOUR), phase: "apply", ran: "apply" }])

  expect(costsIn(root, NOW, LAST_ONE).checks.map((one) => one.check)).toEqual(["apply"])
  expect(costsIn(root, NOW, LAST_NINE).total.runs).toBe(2)
})

test("a period names every row stamped within that period", () => {
  const root = rowsInto(rootFor(), CHANGE_AT, [
    { runId: ONE, ranAt: agoOf(HOUR) },
    { runId: TWO, ranAt: agoOf(2 * DAY) },
  ])

  expect(costsIn(root, NOW, DAY_BACK).total.runs).toBe(1)
})

test("the rows are drawn by the rule the check measuring draws its rows by", () => {
  const root = rowsInto(rootFor(), CHANGE_AT, [{ cpuSeconds: 2, pathsChanged: 3 }])

  const said = linesOf(costsIn(root, NOW, DAY_BACK), "change")

  expect(spacedOnce(said[0])).toBe("change runs cpu mem paths refusals")
  expect(spacedOnce(said[1])).toBe("change-file 1 2.000s 0 B 3 0")
})

test("a row naming the change phase or the apply phase is read, and no other row is", () => {
  const root = rootFor()
  rowsInto(root, CHANGE_AT, [{ runId: ONE, phase: "change", ran: "change-file" }])
  rowsInto(root, APPLY_AT, [{ runId: TWO, phase: "apply", ran: "apply" }])

  expect(costsIn(root, NOW, DAY_BACK).other).toEqual([])
  expect(costsIn(root, NOW, DAY_BACK).total.runs).toBe(2)
})

test("the row a command run wrote beside the same page counts nowhere here", () => {
  const root = rowsInto(rootFor(), CHANGE_AT, [
    { runId: ONE, phase: "change", ran: "change-file" },
    { runId: TWO, phase: "command", ran: "change" },
  ])

  expect(costsIn(root, NOW, DAY_BACK).checks.map((one) => one.check)).toEqual(["change-file"])
  expect(costsIn(root, NOW, DAY_BACK).total.runs).toBe(1)
})
