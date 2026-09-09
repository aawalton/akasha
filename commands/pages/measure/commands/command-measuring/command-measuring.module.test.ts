import { afterAll, expect, test } from "bun:test"
import { put } from "@akasha/testing-system/putting"
import { scratchWorld } from "../../../../../command-system/scratching/scratching.module.code.ts"
import { linesOf, windowIn } from "../../checks/check-measuring/check-measuring.module.code.ts"
import {
  agoOf,
  DAY,
  HOUR,
  NOW,
  spacedOnce,
} from "../../checks/check-measuring/check-measuring.module.test-fixtures.ts"
import { costsIn, foundIn, heldIn } from "./command-measuring.module.code.ts"
import { ONE, pageAt, rowsInto, THREE, TWO } from "./command-measuring.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const LAST_ONE = { by: "runs", runs: 1 } as const

const DAY_BACK = { by: "period", ms: DAY, said: "24h" } as const

const INDEX_AT = pageAt("commands/pages", "index")

const READ_AT = pageAt("commands/pages", "read")

function rootFor(): string {
  return scratch.rootFor("command-measuring-")
}

test("the rows are read from beside the page of the command that ran", () => {
  const root = rowsInto(rootFor(), INDEX_AT, [{ ran: "index" }])

  expect(costsIn(root, NOW, DAY_BACK).checks.map((one) => one.check)).toEqual(["index"])
})

test("every command page is reached by walking the tree rather than by a folder named here", () => {
  const root = rootFor()
  rowsInto(root, INDEX_AT, [{ runId: ONE, ran: "index" }])
  rowsInto(root, READ_AT, [{ runId: TWO, ran: "read" }])

  expect(foundIn(root, "")).toEqual([READ_AT, INDEX_AT].sort())
})

test("a folder git or a package manager owns is walked past", () => {
  const root = rowsInto(rootFor(), INDEX_AT, [{}])
  put(root, `.git/${pageAt("commands/pages", "index")}`, "")
  put(root, `node_modules/${pageAt("commands/pages", "index")}`, "")

  expect(foundIn(root, "")).toEqual([INDEX_AT])
})

test("every numbered file of a page's rows is read rather than the first alone", () => {
  const root = rootFor()
  rowsInto(root, pageAt("commands/pages", "index", 1), [{ runId: ONE }])
  rowsInto(root, pageAt("commands/pages", "index", 2), [{ runId: TWO }])
  rowsInto(root, pageAt("commands/pages", "index", 3), [{ runId: THREE }])

  expect(heldIn(root).runs.length).toBe(3)
})

test("a folder named as a rows file is no file to read", () => {
  const root = rootFor()
  put(root, `${INDEX_AT}/inner`, "")

  expect(foundIn(root, "")).toEqual([])
  expect(heldIn(root).runs).toEqual([])
})

test("a row a write left half appended leaves the file it is in unread", () => {
  const root = rootFor()
  put(root, INDEX_AT, '{"runId":"one","ranAt":"2026-09-05T11')

  expect(heldIn(root).unread).toEqual([INDEX_AT])
})

test("a row naming the command phase is read, and no other row is", () => {
  const root = rowsInto(rootFor(), INDEX_AT, [
    { runId: ONE, phase: "command", ran: "change" },
    { runId: TWO, phase: "change", ran: "change-file" },
  ])

  expect(costsIn(root, NOW, DAY_BACK).checks.map((one) => one.check)).toEqual(["change"])
})

test("the row a change run wrote beside the same page counts nowhere here", () => {
  const root = rowsInto(rootFor(), INDEX_AT, [
    { runId: ONE, phase: "command", ran: "change" },
    { runId: TWO, phase: "apply", ran: "apply" },
  ])

  expect(costsIn(root, NOW, DAY_BACK).total.runs).toBe(1)
})

test("the runs are gathered under the command that ran", () => {
  const root = rootFor()
  rowsInto(root, INDEX_AT, [{ runId: ONE, ran: "index" }])
  rowsInto(root, READ_AT, [{ runId: TWO, ran: "read" }])

  expect(
    costsIn(root, NOW, DAY_BACK)
      .checks.map((one) => one.check)
      .sort()
  ).toEqual(["index", "read"])
})

test("a window is chosen by the rule the check measuring chooses one by", () => {
  expect(windowIn(["--since", "24h"]).chosen).toBe(null)
  expect(windowIn(["--last", "24h"]).chosen).toEqual({ by: "period", ms: DAY, said: "24h" })
})

test("the rows are drawn by the rule the check measuring draws its rows by", () => {
  const root = rootFor()
  rowsInto(root, INDEX_AT, [{ runId: ONE, ranAt: agoOf(2 * HOUR), cpuSeconds: 2, ran: "index" }])
  rowsInto(root, READ_AT, [{ runId: TWO, ranAt: agoOf(HOUR), cpuSeconds: 1, ran: "read" }])

  const said = linesOf(costsIn(root, NOW, LAST_ONE), "command")

  expect(spacedOnce(said[0])).toBe("command runs cpu mem paths refusals")
  expect(spacedOnce(said[1])).toBe("read 1 1.000s 0 B 0 0")
})
