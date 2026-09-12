import { expect, test } from "bun:test"
import type { Told } from "akasha/checks/modules/audit-asking/audit-asking.module.code.ts"
import {
  type Asked,
  askedAnswer,
  brokenBy,
  codeOf,
} from "akasha/commands/modules/audit-answering/audit-answering.module.code.ts"

const ANSWERED: Told = { refusals: [], unrun: [], unanswered: [], broken: null }

function told(some: Partial<Told>): Asked {
  return { told: { ...ANSWERED, ...some }, checks: 55, commit: "abc", also: [] }
}

test("a run no check answered for is refused rather than answered clean", () => {
  const said = askedAnswer({ ...told({}), checks: 0 }, null)
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toBe(
    "this is not an audit — no check answered, so nothing judged and a clean answer would mean nothing"
  )
  expect(said.refusals[1]).toContain("--check <slug>")
})

test("that refusal says nothing judged rather than reading as some checks left out", () => {
  const left = "this answer leaves out 5 checks not yet judging"
  const said = askedAnswer({ ...told({}), checks: 0, also: [left] }, null)
  expect(said.report).toEqual([])
  expect(said.refusals.join(" ")).not.toContain("leaves out")
})

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
