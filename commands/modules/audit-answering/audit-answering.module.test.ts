import { expect, test } from "bun:test"
import type { Judged, Judging } from "akasha/checks/modules/judging/judging.module.code.ts"
import {
  ANSWER_CEILING,
  heldTo,
  judgedOver,
  REASON_CEILING,
  reasonSaid,
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

test("a reason one answer holds whole is carried whole, its lines run together", () => {
  expect(reasonSaid("one\n\ntwo", REASON_CEILING)).toBe("one two")
})

test("a reason of many lines says how many of those lines went", () => {
  const said = reasonSaid(`22 test files failed:\n${"a/b.test.ts\n".repeat(22)}`, 60)
  expect(said).toContain("22 test files failed:")
  expect(said).toContain("a/b.test.ts")
  expect(said).toContain("(19 lines more)")
})

test("a first line past the ceiling says how many characters went", () => {
  const said = reasonSaid("h".repeat(300), REASON_CEILING)
  expect(said.startsWith("h".repeat(REASON_CEILING))).toBe(true)
  expect(said).toContain(`(${300 - REASON_CEILING} characters more)`)
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

test("more refusals than one answer holds keep their start and say how many there are", () => {
  const lines = Array.from({ length: 900 }, (_, at) => `akasha/${at}.ts — ${"held ".repeat(20)}`)
  const said = heldTo(lines, ANSWER_CEILING)
  expect(said.length).toBeLessThan(lines.length)
  expect(said[said.length - 1]).toContain(`${lines.length} refusals in all`)
  expect(said[said.length - 1]).toContain(`the ${said.length - 1} above`)
  expect(new TextEncoder().encode(said.join("\n")).length).toBeLessThan(ANSWER_CEILING + 200)
})

test("every refusal remains when they all fit", () => {
  expect(heldTo(["one", "two"], ANSWER_CEILING)).toEqual(["one", "two"])
})
