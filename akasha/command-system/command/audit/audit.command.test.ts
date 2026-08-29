import { expect, test } from "bun:test"
import type {
  Judged,
  Judging,
  Leaving,
} from "../../../checks-system/judging/judging.module.code.ts"
import type { Given } from "../../calling/calling.module.code.ts"
import { ANSWER_CEILING, audit, heldTo, judgedOver } from "./audit.command.code.ts"

const ROOT = "/var/tmp/nowhere-an-audit-reaches"

function over(files: readonly string[]): Leaving {
  return { root: ROOT, changed: files, at: () => null, was: () => null }
}

function saying(named: readonly string[], said: readonly Judged[]): Judging {
  return { named, over: () => said }
}

function given(): Given {
  return { root: ROOT, calledAs: "akasha audit", from: ROOT, writer: null, agentId: null }
}

test("a phase naming no check is refused rather than answered clean", () => {
  const said = judgedOver(saying([], []), over(["akasha/one.ts", "akasha/two.ts"]))
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("a clean answer would mean nothing")
})

test("checks finding nothing answer 0 and say how much was judged", () => {
  const said = judgedOver(saying(["one", "two"], []), over(["a.ts", "b.ts", "c.ts"]))
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe("2 checks judged 3 files, and none refused")
})

test("what an audit finds is the data's fault, and stands as a refusal per path", () => {
  const found = [
    { path: "akasha/one.ts", reason: "one thing" },
    { path: "akasha/two.ts", reason: "another" },
  ]
  const said = judgedOver(saying(["one"], found), over(["akasha/one.ts", "akasha/two.ts"]))
  expect(said.code).toBe(2)
  expect(said.report[0]).toContain("2 refusals stand")
  expect(said.refusals).toEqual(["akasha/one.ts — one thing", "akasha/two.ts — another"])
})

test("a reason spanning lines comes back on one, so one refusal is one line", () => {
  const found = [{ path: "akasha/one.ts", reason: "first\n  second\n\tthird" }]
  const said = judgedOver(saying(["one"], found), over(["akasha/one.ts"]))
  expect(said.refusals).toEqual(["akasha/one.ts — first second third"])
})

test("a judging that throws is refused as unjudged rather than answered clean", () => {
  const judging: Judging = {
    named: ["one"],
    over: () => {
      throw new Error("the checks could not be reached")
    },
  }
  const said = judgedOver(judging, over(["akasha/one.ts"]))
  expect(said.code).toBe(3)
  expect(said.refusals[0]).toContain("nothing was judged")
  expect(said.refusals[0]).toContain("the checks could not be reached")
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

test("an argument that would narrow what is judged is refused by name", () => {
  const said = audit(["--file-path", "akasha/one.ts"], given())
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("`--file-path` is not an argument this takes")
  expect(said.refusals[0]).toContain("takes nothing that would narrow it")
})

test("a root holding no index is refused rather than answered clean", () => {
  const said = audit([], given())
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("nothing was judged")
})
