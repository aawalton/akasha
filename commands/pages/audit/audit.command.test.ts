import { expect, test } from "bun:test"
import type { Gathered, Phase } from "akasha/checks/modules/checking/checking.module.code.ts"
import {
  over,
  ROOT,
} from "akasha/commands/modules/audit-answering/audit-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  audit,
  leftOutOf,
  meaning,
  narrowedOver,
  narrowedTo,
  notAnAuditIn,
  notYetJudgingIn,
  underOf,
  whollyFor,
} from "akasha/commands/pages/audit/audit.command.code.ts"

function gathered(slugs: readonly string[], runsOn: readonly Phase[]): readonly Gathered[] {
  return slugs.map(
    (slug): Gathered => ({
      slug,
      page: `${slug}.code-check.ts`,
      root: ".",
      runsOn,
      isInput: null,
      run: () => [],
    })
  )
}

function given(): Given {
  return { root: ROOT, calledAs: "akasha audit", from: ROOT, writer: null, agentId: null }
}

test("a run over every check and every file says nothing about being narrowed", () => {
  expect(notAnAuditIn(0, 900, 900)).toEqual([])
})

test("a run narrowed to some of the files says how many of them it judged", () => {
  expect(notAnAuditIn(0, 3, 900)).toEqual([
    "this is not an audit — it judged 3 files rather than every file this repository holds",
  ])
})

test("a run narrowed in both ways says both on one line", () => {
  expect(notAnAuditIn(23, 3, 900)).toEqual([
    "this is not an audit — the 23 checks it left out judged nothing, and it judged 3 files rather than every file this repository holds",
  ])
})

test("a bare run says how many checks it left out for not yet judging", () => {
  const every = [...gathered(["one"], ["audit"]), ...gathered(["two", "three"], [])]
  expect(notYetJudgingIn(every, [])).toEqual(["this answer leaves out 2 checks not yet judging"])
})

test("a run where every check judges says nothing about checks left out that way", () => {
  expect(notYetJudgingIn(gathered(["one"], ["audit"]), [])).toEqual([])
})

test("a run naming a check says nothing about the checks not yet judging", () => {
  expect(notYetJudgingIn(gathered(["one"], []), ["one"])).toEqual([])
})

test("naming no check runs every check that runs at audit", () => {
  const atAudit = gathered(["one"], ["audit"])
  const every = [...atAudit, ...gathered(["two"], ["change"])]
  const said = narrowedTo(every, atAudit, [])
  expect(said.refusals).toEqual([])
  expect(said.checks.map((one) => one.slug)).toEqual(["one"])
})

test("naming no check leaves a check that runs at no audit out", () => {
  const atAudit = gathered(["one"], ["audit"])
  const every = [...atAudit, ...gathered(["two"], ["change"])]
  expect(narrowedTo(every, atAudit, []).checks.map((one) => one.slug)).not.toContain("two")
})

test("naming a check that runs at no audit runs that check", () => {
  const atAudit = gathered(["one"], ["audit"])
  const every = [...atAudit, ...gathered(["two"], ["change"])]
  const said = narrowedTo(every, atAudit, ["two"])
  expect(said.refusals).toEqual([])
  expect(said.checks.map((one) => one.slug)).toEqual(["two"])
})

test("a slug naming no check is refused, and the checks the index names are said", () => {
  const atAudit = gathered(["one", "two"], ["audit"])
  const said = narrowedTo(atAudit, atAudit, ["three"])
  expect(said.checks).toEqual([])
  expect(said.refusals[0]).toContain("`three` is no check the index names")
  expect(said.refusals[0]).toContain("`one`, `two`")
})

test("naming a check runs only the check named", () => {
  const atAudit = gathered(["one", "two"], ["audit"])
  const said = narrowedTo(atAudit, atAudit, ["two"])
  expect(said.refusals).toEqual([])
  expect(said.checks.map((one) => one.slug)).toEqual(["two"])
})

test("naming no path leaves the change as it came", () => {
  const change = over(["a/one.ts", "a/two.ts", "b/three.ts"])
  const said = narrowedOver(change, [])
  expect(said.refusals).toEqual([])
  expect(said.change.changed).toEqual(["a/one.ts", "a/two.ts", "b/three.ts"])
})

test("naming a file narrows the change to that file", () => {
  const change = over(["a/one.ts", "a/two.ts", "b/three.ts"])
  const said = narrowedOver(change, ["a/two.ts"])
  expect(said.refusals).toEqual([])
  expect(said.change.changed).toEqual(["a/two.ts"])
})

test("naming a folder means every file under it", () => {
  const change = over(["a/one.ts", "a/two.ts", "b/three.ts"])
  const said = narrowedOver(change, ["a"])
  expect(said.refusals).toEqual([])
  expect(said.change.changed).toEqual(["a/one.ts", "a/two.ts"])
})

test("a folder named with a trailing slash means the same files", () => {
  const change = over(["a/one.ts", "a/two.ts", "b/three.ts"])
  expect(narrowedOver(change, ["a/"]).change.changed).toEqual(["a/one.ts", "a/two.ts"])
})

test("two paths reaching one file reach that file once", () => {
  const change = over(["a/one.ts", "a/two.ts", "b/three.ts"])
  const said = narrowedOver(change, ["a", "a/one.ts"])
  expect(said.change.changed).toEqual(["a/one.ts", "a/two.ts"])
})

test("a path naming no file and no folder is refused", () => {
  const change = over(["a/one.ts"])
  const said = narrowedOver(change, ["c/four.ts"])
  expect(said.refusals[0]).toContain("`c/four.ts` is no file this repository holds")
})

test("a run naming no path is handed the root, so each check's audit reads the whole tree", () => {
  expect(whollyFor([], ROOT)).toBe(ROOT)
})

test("a run naming a path is handed no root, so the checks judge that change instead", () => {
  expect(whollyFor(["a/one.ts"], ROOT)).toBe(null)
})

test("a file is told from a folder holding one under it", () => {
  expect(underOf(["a/one.ts", "ab/two.ts"], "a")).toEqual(["a/one.ts"])
})

test("a run over every check that runs at audit leaves none of them out", () => {
  const atAudit = gathered(["one", "two"], ["audit"])
  expect(leftOutOf(atAudit, atAudit)).toBe(0)
})

test("a run of a check that runs at no audit leaves every audit check out", () => {
  const atAudit = gathered(["one", "two"], ["audit"])
  expect(leftOutOf(atAudit, gathered(["three"], ["change"]))).toBe(2)
})

test("a flag naming no check is refused", () => {
  expect(meaning(["--check"]).refusal).toContain("nothing followed it")
})

test("a flag naming no path is refused", () => {
  expect(meaning(["--file-path"]).refusal).toContain("nothing followed it")
})

test("a check named twice is refused rather than run twice", () => {
  expect(meaning(["--check", "one", "--check", "one"]).refusal).toContain("named more than once")
})

test("a path named twice is refused rather than judged twice", () => {
  expect(meaning(["--file-path", "a.ts", "--file-path", "a.ts"]).refusal).toContain(
    "named more than once"
  )
})

test("several checks are named in one call", () => {
  expect(meaning(["--check", "one", "--check", "two"]).only).toEqual(["one", "two"])
})

test("several paths are named in one call", () => {
  expect(meaning(["--file-path", "a.ts", "--file-path", "b.ts"]).paths).toEqual(["a.ts", "b.ts"])
})

test("checks and paths are narrowed together in one call", () => {
  const said = meaning(["--check", "one", "--file-path", "a.ts"])
  expect(said.refusal).toBe(null)
  expect(said.only).toEqual(["one"])
  expect(said.paths).toEqual(["a.ts"])
})

test("a check named as a path is not read as a check", () => {
  expect(meaning(["--file-path", "one"]).only).toEqual([])
})

test("an argument that is neither flag is refused by name, and both flags are said", async () => {
  const said = await audit(["--everything"], given())
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("`--everything` is not an argument this takes")
  expect(said.refusals[0]).toContain("--check")
  expect(said.refusals[0]).toContain("--file-path")
})

test("a root holding no index is refused rather than answered clean", async () => {
  const said = await audit([], given())
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("nothing was judged")
})
