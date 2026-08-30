import { expect, test } from "bun:test"
import type { Gathered } from "../../../checks-system/checking/checking.module.code.ts"
import type {
  Judged,
  Judging,
  Change,
} from "../../../checks-system/judging/judging.module.code.ts"
import type { Given } from "../../calling/calling.module.code.ts"
import {
  ANSWER_CEILING,
  audit,
  heldTo,
  judgedOver,
  meaning,
  narrowedTo,
} from "./audit.command.code.ts"

const ROOT = "/var/tmp/nowhere-an-audit-reaches"

function over(files: readonly string[]): Change {
  return { root: ROOT, changed: files, after: () => null, before: () => null }
}

function saying(named: readonly string[], said: readonly Judged[]): Judging {
  return { named, over: () => said }
}

function standing(slugs: readonly string[]): readonly Gathered[] {
  return slugs.map((slug) => ({ slug, page: `${slug}.check.ts`, runsOn: ["audit"], run: () => [] }))
}

function given(): Given {
  return { root: ROOT, calledAs: "akasha audit", from: ROOT, writer: null, agentId: null }
}

test("a phase naming no check is refused rather than answered clean", () => {
  const said = judgedOver(saying([], []), over(["akasha/one.ts", "akasha/two.ts"]), 0)
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("a clean answer would mean nothing")
})

test("checks finding nothing answer 0 and say how much was judged", () => {
  const said = judgedOver(saying(["one", "two"], []), over(["a.ts", "b.ts", "c.ts"]), 2)
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report).toEqual(["2 checks judged 3 files, and none refused"])
})

test("what an audit finds is the data's fault, and stands as a refusal per path", () => {
  const found = [
    { path: "akasha/one.ts", reason: "one thing" },
    { path: "akasha/two.ts", reason: "another" },
  ]
  const said = judgedOver(saying(["one"], found), over(["akasha/one.ts", "akasha/two.ts"]), 1)
  expect(said.code).toBe(2)
  expect(said.report[0]).toContain("2 refusals stand")
  expect(said.refusals).toEqual(["akasha/one.ts — one thing", "akasha/two.ts — another"])
})

test("a run narrowed to some of the checks says it is not an audit", () => {
  const said = judgedOver(saying(["one"], []), over(["akasha/one.ts"]), 24)
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("1 check of the 24 that run at audit judged 1 file, and none refused")
  expect(said.report[1]).toBe("this is not an audit — the 23 checks it left out judged nothing")
})

test("a narrowed run that finds something says both what it found and what it skipped", () => {
  const found = [{ path: "akasha/one.ts", reason: "one thing" }]
  const said = judgedOver(saying(["one"], found), over(["akasha/one.ts"]), 24)
  expect(said.code).toBe(2)
  expect(said.report[1]).toContain("this is not an audit")
})

test("a run over every check says nothing about being narrowed", () => {
  const said = judgedOver(saying(["one", "two"], []), over(["akasha/one.ts"]), 2)
  expect(said.report.join(" ")).not.toContain("not an audit")
})

test("a reason spanning lines comes back on one, so one refusal is one line", () => {
  const found = [{ path: "akasha/one.ts", reason: "first\n  second\n\tthird" }]
  const said = judgedOver(saying(["one"], found), over(["akasha/one.ts"]), 1)
  expect(said.refusals).toEqual(["akasha/one.ts — first second third"])
})

test("a judging that throws is refused as unjudged rather than answered clean", () => {
  const judging: Judging = {
    named: ["one"],
    over: () => {
      throw new Error("the checks could not be reached")
    },
  }
  const said = judgedOver(judging, over(["akasha/one.ts"]), 1)
  expect(said.code).toBe(3)
  expect(said.refusals[0]).toContain("nothing was judged")
  expect(said.refusals[0]).toContain("the checks could not be reached")
})

test("naming no check leaves every check standing", () => {
  const every = standing(["one", "two"])
  expect(narrowedTo(every, []).checks).toEqual(every)
})

test("a named check that runs at no audit is refused, and the ones that do are named", () => {
  const said = narrowedTo(standing(["one", "two"]), ["three"])
  expect(said.checks).toEqual([])
  expect(said.refusals[0]).toContain("`three` is no check that runs at audit")
  expect(said.refusals[0]).toContain("`one`, `two`")
})

test("naming a check leaves only that one standing", () => {
  const said = narrowedTo(standing(["one", "two"]), ["two"])
  expect(said.refusals).toEqual([])
  expect(said.checks.map((one) => one.slug)).toEqual(["two"])
})

test("a flag naming no check is refused", () => {
  expect(meaning(["--check"]).refusal).toContain("nothing followed it")
})

test("a check named twice is refused rather than run twice", () => {
  expect(meaning(["--check", "one", "--check", "one"]).refusal).toContain("named more than once")
})

test("several checks are named in one call", () => {
  expect(meaning(["--check", "one", "--check", "two"]).only).toEqual(["one", "two"])
})

test("more refusals than one answer holds keep their start and say how many are missing", () => {
  const lines = Array.from({ length: 900 }, (_, at) => `akasha/${at}.ts — ${"held ".repeat(20)}`)
  const said = heldTo(lines, ANSWER_CEILING)
  expect(said.length).toBeLessThan(lines.length)
  expect(said[said.length - 1]).toContain("more refusals is not here")
  expect(new TextEncoder().encode(said.join("\n")).length).toBeLessThan(ANSWER_CEILING + 200)
})

test("every refusal stands when they all fit", () => {
  expect(heldTo(["one", "two"], ANSWER_CEILING)).toEqual(["one", "two"])
})

test("an argument that would narrow which files are judged is refused by name", () => {
  const said = audit(["--file-path", "akasha/one.ts"], given())
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("`--file-path` is not an argument this takes")
  expect(said.refusals[0]).toContain("narrows which checks see them")
})

test("a root holding no index is refused rather than answered clean", () => {
  const said = audit([], given())
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("nothing was judged")
})
