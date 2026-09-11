import { expect, test } from "bun:test"
import { indexIsLevelWithThePages } from "akasha/checks/code-checks/pages/index-is-level-with-the-pages/index-is-level-with-the-pages.code-check.audit.code.ts"

const ROOT = "/repo"

test("an audit is handed the root the reconcile is read over", () => {
  let asked = ""
  indexIsLevelWithThePages(ROOT, (root) => {
    asked = root
    return { added: [], changed: [], went: [] }
  })
  expect(asked).toBe(ROOT)
})

test("an audit refuses each file the reconcile says the index differs on", () => {
  const said = indexIsLevelWithThePages(ROOT, () => ({
    added: ["path/checks/one.ts.jsonl"],
    changed: [],
    went: ["path/checks/gone.ts.jsonl"],
  }))
  expect(said.map((one) => one.path)).toEqual(["checks/one.ts", "checks/gone.ts"])
})

test("an audit passes over the churn a page outside the commit makes", () => {
  const said = indexIsLevelWithThePages(ROOT, () => ({
    added: ["path/seats/thea.seat.edits.uncommitted.jsonl.jsonl"],
    changed: ["listing/path.jsonl"],
    went: ["rule/read/at-path.jsonl"],
  }))
  expect(said).toEqual([])
})
