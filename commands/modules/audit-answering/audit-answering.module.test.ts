import { expect, test } from "bun:test"
import type { Told } from "akasha/checks/modules/audit-asking/audit-asking.module.code.ts"
import type { Judged, Judging } from "akasha/checks/modules/judging/judging.module.code.ts"
import {
  type Asked,
  askedAnswer,
  brokenBy,
  codeOf,
  judgedOver,
} from "akasha/commands/modules/audit-answering/audit-answering.module.code.ts"
import { over } from "akasha/commands/modules/audit-answering/audit-answering.module.test-fixtures.ts"

const NARROWED = ["this is not an audit — the 23 checks it left out judged nothing"]

function saying(named: readonly string[], said: readonly Judged[]): Judging {
  return { named, checksFor: () => named, over: async () => said }
}

function taking(named: readonly string[], takenBy: readonly string[]): Judging {
  return { named, checksFor: () => takenBy, over: async () => [] }
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

test("what an audit finds is the data's fault, and is a refusal per path", async () => {
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

test("a line handed in is carried after what the checks found", async () => {
  const said = await judgedOver(saying(["one"], []), over(["akasha/one.ts"]), NARROWED)
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("1 check judged 1 file, and none refused")
  expect(said.report[1]).toBe(NARROWED[0])
})

test("a run that finds something says both what it found and what was handed in", async () => {
  const found = [{ path: "akasha/one.ts", reason: "one thing" }]
  const said = await judgedOver(saying(["one"], found), over(["akasha/one.ts"]), NARROWED)
  expect(said.code).toBe(2)
  expect(said.report[1]).toBe(NARROWED[0])
})

test("a reason spanning lines comes back on one, so one refusal is one line", async () => {
  const found = [{ path: "akasha/one.ts", reason: "first\n  second\n\tthird" }]
  const said = await judgedOver(saying(["one"], found), over(["akasha/one.ts"]), [])
  expect(said.refusals).toEqual(["akasha/one.ts — first second third"])
})

test("a refusal is kept whole, and the answer names the file and the call opening it", async () => {
  const found = [{ path: "a.ts", reason: "one\ntwo" }]
  const kept: string[] = []
  const said = await judgedOver(saying(["one"], found), over(["a.ts"]), [], (whole) => {
    kept.push(...whole)
    return "at.txt"
  })
  expect(kept).toEqual(["a.ts — one\ntwo"])
  expect(said.refusals[0]).toBe("a.ts — one two")
  expect(said.refusals[1]).toContain("akasha read --file-path at.txt")
})

test("a run that finds nothing keeps nothing and names no file", async () => {
  const kept: string[] = []
  const said = await judgedOver(saying(["one"], []), over(["a.ts"]), [], (whole) => {
    kept.push(...whole)
    return "at.txt"
  })
  expect(kept).toEqual([])
  expect(said.refusals).toEqual([])
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

const ANSWERED: Told = { refusals: [], unrun: [], unanswered: [], broken: null }

function told(some: Partial<Told>): Asked {
  return { told: { ...ANSWERED, ...some }, checks: 55, commit: "abc", also: [] }
}

test("a run the verdicts answer clean says how many checks answered and for what", () => {
  const said = askedAnswer(told({}), null)
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe("55 checks answered for abc, and none refused")
})

test("a refusal a verdict carries is answered as the data's fault", () => {
  const said = askedAnswer(told({ refusals: ["one — a.ts — no"] }), null)
  expect(said.code).toBe(2)
  expect(said.refusals).toEqual(["one — a.ts — no"])
  expect(said.report[0]).toContain("1 refusal in all")
})

test("a check the round could not run is answered as operational", () => {
  const said = askedAnswer(told({ unrun: ["one"] }), null)
  expect(said.code).toBe(3)
  expect(said.report[1]).toContain("1 check could not run")
})

test("a check unanswered at that commit is named rather than counted clean", () => {
  const said = askedAnswer(told({ unanswered: ["one"] }), null)
  expect(said.code).toBe(3)
  expect(said.report[1]).toContain("1 check is unanswered there: one")
})

test("a round that would not start is refused rather than answered clean", () => {
  const said = askedAnswer(told({ broken: "the unit would not start" }), null)
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("no round of the audit service ran")
})

test("a refusal a verdict carries is kept whole, and the answer names where", () => {
  const kept: string[] = []
  const said = askedAnswer(told({ refusals: ["one — a.ts — no"] }), (whole) => {
    kept.push(...whole)
    return "at.txt"
  })
  expect(kept).toEqual(["one — a.ts — no"])
  expect(said.refusals[1]).toContain("akasha read --file-path at.txt")
})

test("a run whose verdicts refused nothing keeps nothing and names no file", () => {
  expect(askedAnswer(told({}), () => "at.txt").refusals).toEqual([])
})

test("a check left unanswered makes the run operational though nothing refused", () => {
  expect(codeOf({ ...ANSWERED, unanswered: ["one"] })).toBe(3)
  expect(codeOf({ ...ANSWERED, refusals: ["one — a.ts — no"] })).toBe(2)
  expect(codeOf(ANSWERED)).toBe(0)
})

const READ_FAULT = new Error("the verdicts would not be read")

test("a fault before any round ran says nothing was judged", () => {
  const said = brokenBy(READ_FAULT)
  expect(said.code).toBe(3)
  expect(said.refusals.length).toBe(1)
  expect(said.refusals[0]?.startsWith("nothing was judged — ")).toBe(true)
  expect(said.refusals[0]).toContain("the verdicts would not be read")
})

test("a fault after a round ran names those rounds rather than saying nothing was judged", () => {
  const said = brokenBy(READ_FAULT, ["typecheck", "lint-clean"])
  expect(said.code).toBe(3)
  expect(said.refusals[0]).toContain("2 rounds of the audit service ran before this stopped —")
  expect(said.refusals[0]).toContain("the verdicts would not be read")
  expect(said.refusals[1]).toBe(
    "those rounds were asked for typecheck; lint-clean, and what they judged is in their verdicts"
  )
})

test("a round that would not start after one ran is not answered as no round running", () => {
  const asking = { ...told({ broken: "the unit would not start" }), rounds: ["typecheck"] }
  const said = askedAnswer(asking, null)
  expect(said.code).toBe(3)
  expect(said.refusals[0]).toBe(
    "1 round of the audit service ran, and no round after that started — the unit would not start"
  )
})
