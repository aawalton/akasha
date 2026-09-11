import { expect, test } from "bun:test"
import { indexIsLevelWithThePages } from "akasha/checks/code-checks/pages/index-is-level-with-the-pages/index-is-level-with-the-pages.code-check.audit.code.ts"

const ROOT = "/repo"

const STILL = { at: () => "abc", moved: () => [] }

test("an audit is handed the root the reconcile is read over", () => {
  let asked = ""
  indexIsLevelWithThePages(ROOT, {
    ...STILL,
    read: (root) => {
      asked = root
      return { added: [], changed: [], went: [] }
    },
  })
  expect(asked).toBe(ROOT)
})

test("an audit refuses each file the reconcile says the index differs on", () => {
  const said = indexIsLevelWithThePages(ROOT, {
    ...STILL,
    read: () => ({
      added: ["path/checks/one.ts.jsonl"],
      changed: [],
      went: ["path/checks/gone.ts.jsonl"],
    }),
  })
  expect(said.map((one) => one.path)).toEqual(["checks/one.ts", "checks/gone.ts"])
})

test("an audit passes over the churn a page outside the commit makes", () => {
  const said = indexIsLevelWithThePages(ROOT, {
    ...STILL,
    read: () => ({
      added: ["path/seats/thea.seat.edits.uncommitted.jsonl.jsonl"],
      changed: ["listing/path.jsonl"],
      went: ["rule/read/at-path.jsonl"],
    }),
  })
  expect(said).toEqual([])
})

test("a repository that never moved while the reconcile ran is asked for no span", () => {
  let asked = 0
  const said = indexIsLevelWithThePages(ROOT, {
    at: () => "abc",
    read: () => ({ added: ["path/checks/one.ts.jsonl"], changed: [], went: [] }),
    moved: () => {
      asked += 1
      return []
    },
  })
  expect(asked).toBe(0)
  expect(said.map((one) => one.path)).toEqual(["checks/one.ts"])
})

test("a file a commit landing while the reconcile ran touched refuses nothing", () => {
  const commits = ["abc", "def"]
  let at = 0
  const said = indexIsLevelWithThePages(ROOT, {
    at: () => commits[at++] ?? "",
    read: () => ({
      added: ["path/checks/one.ts.jsonl"],
      changed: [],
      went: ["path/checks/gone.ts.jsonl"],
    }),
    moved: () => ["checks/gone.ts"],
  })
  expect(said.map((one) => one.path)).toEqual(["checks/one.ts"])
})

test("the span asked for runs from the commit the reconcile opened at to the one it closed at", () => {
  const commits = ["abc", "def"]
  let at = 0
  const asked: string[] = []
  indexIsLevelWithThePages(ROOT, {
    at: () => commits[at++] ?? "",
    read: () => ({ added: [], changed: [], went: [] }),
    moved: (root, from, to) => {
      asked.push(root, from, to)
      return []
    },
  })
  expect(asked).toEqual([ROOT, "abc", "def"])
})
