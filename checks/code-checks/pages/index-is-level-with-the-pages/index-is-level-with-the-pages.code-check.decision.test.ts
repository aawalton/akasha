import { expect, test } from "bun:test"
import {
  fileIn,
  judgedEntry,
  judgedIn,
  namesOneFile,
  stemOf,
} from "akasha/checks/code-checks/pages/index-is-level-with-the-pages/index-is-level-with-the-pages.code-check.decision.code.ts"

const NOTHING = { added: [], changed: [], went: [] }

test("an entry is stripped of the ending every entry file carries", () => {
  expect(stemOf("path/checks/one.ts.jsonl")).toBe("path/checks/one.ts")
  expect(stemOf("path/checks/one.ts")).toBe("path/checks/one.ts")
})

test("an entry naming one file is told from one gathering many", () => {
  expect(namesOneFile("path/checks/one.ts.jsonl")).toBe(true)
  expect(namesOneFile("import/path/checks/one.ts.jsonl")).toBe(true)
  expect(namesOneFile("listing/path.jsonl")).toBe(false)
  expect(namesOneFile("rule/read/at-path.jsonl")).toBe(false)
  expect(namesOneFile("identity/page-type/module/slug/checking.jsonl")).toBe(false)
})

test("an entry naming a file no commit carries is judged by nothing", () => {
  expect(judgedEntry("path/seats/thea.seat.edits.uncommitted.jsonl.jsonl")).toBe(false)
  expect(judgedEntry("path/checks/one.ts.jsonl")).toBe(true)
})

test("the file an entry names is read back out of the entry", () => {
  expect(fileIn("path/checks/one.ts.jsonl")).toBe("checks/one.ts")
  expect(fileIn("import/path/checks/one.ts.jsonl")).toBe("checks/one.ts")
})

test("a drift with nothing in it refuses nothing", () => {
  expect(judgedIn(NOTHING)).toEqual([])
})

test("a file the index never filed is refused, and named", () => {
  const said = judgedIn({ ...NOTHING, added: ["path/checks/one.ts.jsonl"] })
  expect(said.map((one) => one.path)).toEqual(["checks/one.ts"])
  expect(said[0]?.reason).toContain("missing from the index")
})

test("a file the index holds differing from its page is refused", () => {
  const said = judgedIn({ ...NOTHING, changed: ["path/checks/one.ts.jsonl"] })
  expect(said[0]?.reason).toContain("differing from what its page says")
})

test("a file the index holds and no page names is refused", () => {
  const said = judgedIn({ ...NOTHING, went: ["path/checks/gone.ts.jsonl"] })
  expect(said.map((one) => one.path)).toEqual(["checks/gone.ts"])
  expect(said[0]?.reason).toContain("named by no page")
})

test("the churn an uncommitted page makes refuses nothing", () => {
  const said = judgedIn({
    added: ["path/seats/thea.seat.edits.uncommitted.jsonl.jsonl"],
    changed: ["listing/path.jsonl"],
    went: ["rule/read/at-path.jsonl"],
  })
  expect(said).toEqual([])
})
