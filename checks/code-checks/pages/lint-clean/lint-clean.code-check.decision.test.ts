import { afterAll, expect, test } from "bun:test"
import { change, gone } from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  carriedIn,
  judgedOf,
  lookedAt,
  outsideOf,
  readsIn,
  reasonOf,
} from "./lint-clean.code-check.decision.code.ts"
import {
  CLEAN,
  READS,
  RULE,
  repo,
  STYLED,
  said,
  scratch,
} from "./lint-clean.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("the files judged are the ones the linter reads, said once and in order", () => {
  const root = repo({
    "akasha/two.ts": CLEAN,
    "akasha/one.ts": CLEAN,
    "akasha/held.tsx": CLEAN,
    "akasha/held.css": STYLED,
    "akasha/held.md": "held",
  })
  const changed = [
    "akasha/two.ts",
    "akasha/one.ts",
    "akasha/two.ts",
    "akasha/held.tsx",
    "akasha/held.css",
    "akasha/held.md",
  ]
  expect(carriedIn(change(root, changed), READS)).toEqual([
    "akasha/held.css",
    "akasha/held.tsx",
    "akasha/one.ts",
    "akasha/two.ts",
  ])
})

test("a stylesheet and a body written with JSX are both read, and a note is not", () => {
  expect(lookedAt("akasha/one.css", READS)).toBe(true)
  expect(lookedAt("akasha/one.tsx", READS)).toBe(true)
  expect(lookedAt("akasha/one.ts", READS)).toBe(true)
  expect(lookedAt("akasha/one.md", READS)).toBe(false)
})

test("the names the configuration reads are the names the check reads", () => {
  expect(readsIn(said('{"files":{"includes":["**/*.ts","**/*.js","!**/node_modules"]}}'))).toEqual([
    ".ts",
    ".js",
  ])
})

test("a configuration narrowing by no name leaves every changed file read", () => {
  expect(readsIn(said('{"linter":{"enabled":true}}'))).toBe(null)
  expect(lookedAt("akasha/one.js", null)).toBe(true)
})

test("a configuration that will not parse narrows nothing rather than throwing", () => {
  expect(readsIn(said("{not json"))).toBe(null)
  expect(readsIn(null)).toBe(null)
})

test("a file the change takes away is judged by nothing", () => {
  const root = repo({ "akasha/one.ts": CLEAN })
  expect(carriedIn(change(root, ["akasha/one.ts"], gone), READS)).toEqual([])
})

test("the mirror's root is taken out of what is reported", () => {
  expect(outsideOf("held at /held/one.ts, under /held", "/held")).toBe(
    "held at one.ts, under the mirror this change was written into"
  )
})

test("the root is taken out and said as whatever the caller looked in", () => {
  expect(outsideOf("held under /held", "/held", "the tree")).toBe("held under the tree")
})

test("a finding is said as its rule, where it is and what the linter said", () => {
  const found = { path: "akasha/one.ts", line: 12, column: 7, rule: RULE, said: "This is unused." }
  expect(reasonOf(found)).toBe(`\`${RULE}\` at line 12, column 7 — This is unused.`)
})

test("a run that failed is answered against the first file named", () => {
  const looked = { code: -1, errors: 0, found: [], failed: "nothing is under /held" }
  const judged = judgedOf(looked, "akasha/one.ts", "/held")
  expect(judged.length).toBe(1)
  expect(judged[0]?.path).toBe("akasha/one.ts")
  expect(judged[0]?.reason).toBe(
    "nothing is under the mirror this change was written into. A linter that could not look has verified nothing, so nothing was judged."
  )
})
