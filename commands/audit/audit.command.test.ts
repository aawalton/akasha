import { expect, test } from "bun:test"
import type { Gathered, Phase } from "@akasha/checks/checking"
import type { Judged, Judging } from "@akasha/checks/judging"
import type { Change } from "@akasha/pages-system/change"
import type { Given } from "../../command-system/calling/calling.module.code.ts"
import {
  ANSWER_CEILING,
  audit,
  heldTo,
  judgedOver,
  leftOutOf,
  meaning,
  narrowedOver,
  narrowedTo,
  notAnAuditIn,
  underOf,
} from "./audit.command.code.ts"

const ROOT = "/var/tmp/nowhere-an-audit-reaches"

function over(files: readonly string[]): Change {
  return { root: ROOT, changed: files, after: () => null, before: () => null }
}

function saying(named: readonly string[], said: readonly Judged[]): Judging {
  return { named, checksFor: () => named, over: async () => said }
}

function taking(named: readonly string[], takenBy: readonly string[]): Judging {
  return { named, checksFor: () => takenBy, over: async () => [] }
}

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

test("a phase naming no check is refused rather than answered clean", async () => {
  const said = await judgedOver(saying([], []), over(["akasha/one.ts", "akasha/two.ts"]), [])
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("a clean answer would mean nothing")
})

test("checks finding nothing answer 0 and say how much was judged", async () => {
  const said = await judgedOver(saying(["one", "two"], []), over(["a.ts", "b.ts", "c.ts"]), [])
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report).toEqual(["2 checks judged 3 files, and none refused"])
})

test("what an audit finds is the data's fault, and stands as a refusal per path", async () => {
  const found = [
    { path: "akasha/one.ts", reason: "one thing" },
    { path: "akasha/two.ts", reason: "another" },
  ]
  const said = await judgedOver(
    saying(["one"], found),
    over(["akasha/one.ts", "akasha/two.ts"]),
    []
  )
  expect(said.code).toBe(2)
  expect(said.report[0]).toContain("2 refusals in all")
  expect(said.refusals).toEqual(["akasha/one.ts — one thing", "akasha/two.ts — another"])
})

test("a check that could not run is answered as operational rather than as the data's fault", async () => {
  const found = [{ path: "one.code-check.ts", reason: "the check `one` threw", threw: true }]
  const said = await judgedOver(saying(["one"], found), over(["akasha/one.ts"]), [])
  expect(said.code).toBe(3)
  expect(said.report[1]).toContain("1 check could not run")
})

test("a check that could not run is told apart from a check that refused", async () => {
  const found = [
    { path: "akasha/one.ts", reason: "one thing" },
    { path: "two.code-check.ts", reason: "the check `two` threw", threw: true },
  ]
  const said = await judgedOver(saying(["one", "two"], found), over(["akasha/one.ts"]), [])
  expect(said.code).toBe(3)
  expect(said.report[0]).toContain("2 refusals in all")
  expect(said.report[1]).toContain("1 check could not run")
})

test("a run no check takes input from is refused rather than answered clean", async () => {
  const said = await judgedOver(taking(["one", "two"], []), over(["akasha/one.png"]), [])
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("no check takes a file named as input")
})

test("a run narrowed to some of the checks says it is not an audit", async () => {
  const said = await judgedOver(
    saying(["one"], []),
    over(["akasha/one.ts"]),
    notAnAuditIn(23, 1, 1)
  )
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("1 check judged 1 file, and none refused")
  expect(said.report[1]).toBe("this is not an audit — the 23 checks it left out judged nothing")
})

test("a run narrowed to a check that runs at no audit says it is not an audit", async () => {
  const said = await judgedOver(
    saying(["two"], []),
    over(["akasha/one.ts"]),
    notAnAuditIn(24, 1, 1)
  )
  expect(said.code).toBe(0)
  expect(said.report[1]).toBe("this is not an audit — the 24 checks it left out judged nothing")
})

test("a narrowed run that finds something says both what it found and what it skipped", async () => {
  const found = [{ path: "akasha/one.ts", reason: "one thing" }]
  const said = await judgedOver(
    saying(["one"], found),
    over(["akasha/one.ts"]),
    notAnAuditIn(23, 1, 1)
  )
  expect(said.code).toBe(2)
  expect(said.report[1]).toContain("this is not an audit")
})

test("a run over every check and every file says nothing about being narrowed", () => {
  expect(notAnAuditIn(0, 900, 900)).toEqual([])
})

test("a run narrowed to some of the files says how many of them it judged", () => {
  expect(notAnAuditIn(0, 3, 900)).toEqual([
    "this is not an audit — it judged 3 files of the 900 the index names",
  ])
})

test("a run narrowed in both ways says both on one line", () => {
  expect(notAnAuditIn(23, 3, 900)).toEqual([
    "this is not an audit — the 23 checks it left out judged nothing, and it judged 3 files of the 900 the index names",
  ])
})

test("a reason spanning lines comes back on one, so one refusal is one line", async () => {
  const found = [{ path: "akasha/one.ts", reason: "first\n  second\n\tthird" }]
  const said = await judgedOver(saying(["one"], found), over(["akasha/one.ts"]), [])
  expect(said.refusals).toEqual(["akasha/one.ts — first second third"])
})

test("a judging that throws is refused as unjudged rather than answered clean", async () => {
  const judging: Judging = {
    named: ["one"],
    checksFor: () => ["one"],
    over: async () => {
      throw new Error("the checks could not be reached")
    },
  }
  const said = await judgedOver(judging, over(["akasha/one.ts"]), [])
  expect(said.code).toBe(3)
  expect(said.refusals[0]).toContain("nothing was judged")
  expect(said.refusals[0]).toContain("the checks could not be reached")
})

test("naming no check runs every check that runs at audit", () => {
  const atAudit = gathered(["one"], ["audit"])
  const every = [...atAudit, ...gathered(["two"], ["patch"])]
  const said = narrowedTo(every, atAudit, [])
  expect(said.refusals).toEqual([])
  expect(said.checks.map((one) => one.slug)).toEqual(["one"])
})

test("naming no check leaves a check that runs at no audit out", () => {
  const atAudit = gathered(["one"], ["audit"])
  const every = [...atAudit, ...gathered(["two"], ["patch"])]
  expect(narrowedTo(every, atAudit, []).checks.map((one) => one.slug)).not.toContain("two")
})

test("naming a check that runs at no audit runs that check", () => {
  const atAudit = gathered(["one"], ["audit"])
  const every = [...atAudit, ...gathered(["two"], ["patch"])]
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

test("naming no path leaves the change as the index left it", () => {
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

test("naming a folder means every file the index names under it", () => {
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
  expect(said.refusals[0]).toContain("`c/four.ts` is no file the index names")
})

test("a file the index names is told from a folder it names one under", () => {
  expect(underOf(["a/one.ts", "ab/two.ts"], "a")).toEqual(["a/one.ts"])
})

test("a run over every check that runs at audit leaves none of them out", () => {
  const atAudit = gathered(["one", "two"], ["audit"])
  expect(leftOutOf(atAudit, atAudit)).toBe(0)
})

test("a run of a check that runs at no audit leaves every audit check out", () => {
  const atAudit = gathered(["one", "two"], ["audit"])
  expect(leftOutOf(atAudit, gathered(["three"], ["patch"]))).toBe(2)
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

test("more refusals than one answer holds keep their start and say how many there are", () => {
  const lines = Array.from({ length: 900 }, (_, at) => `akasha/${at}.ts — ${"held ".repeat(20)}`)
  const said = heldTo(lines, ANSWER_CEILING)
  expect(said.length).toBeLessThan(lines.length)
  expect(said[said.length - 1]).toContain(`${lines.length} refusals in all`)
  expect(said[said.length - 1]).toContain(`the ${said.length - 1} above`)
  expect(new TextEncoder().encode(said.join("\n")).length).toBeLessThan(ANSWER_CEILING + 200)
})

test("every refusal stands when they all fit", () => {
  expect(heldTo(["one", "two"], ANSWER_CEILING)).toEqual(["one", "two"])
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
