import { expect, test } from "bun:test"
import type { Given } from "../../calling/calling.module.code.ts"
import { elaine, linesOf, readIn, sinceDay } from "./elaine.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha elaine", from: root, writer: null, agentId: null }
}

test("nothing said is refused, naming what it takes", async () => {
  const said = await elaine([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("health-snapshot")
})

test("an act it does not carry is refused", () => {
  const said = readIn(["sleep"])
  expect("refused" in said).toBe(true)
})

test("a second word after the act is refused", () => {
  const said = readIn(["health-snapshot", "again"])
  expect("refused" in said && said.refused[0]).toContain("one call names one act")
})

test("a flag it does not take is refused", () => {
  const said = readIn(["health-snapshot", "--weeks", "2"])
  expect("refused" in said).toBe(true)
})

test("a flag naming a value with nothing after it is refused", () => {
  const said = readIn(["health-snapshot", "--days"])
  expect("refused" in said && said.refused[0]).toContain("names a value")
})

test("the window it takes by default is fourteen days", () => {
  const said = readIn(["health-snapshot"])
  expect("refused" in said).toBe(false)
  expect(!("refused" in said) && said.days).toBe(14)
})

test("a window of no days is refused rather than read as the default", () => {
  const said = readIn(["health-snapshot", "--days", "0"])
  expect("refused" in said && said.refused[0]).toContain("positive integer")
})

test("a window that is no integer is refused", () => {
  expect("refused" in readIn(["health-snapshot", "--days", "two"])).toBe(true)
  expect("refused" in readIn(["health-snapshot", "--days", "1.5"])).toBe(true)
  expect("refused" in readIn(["health-snapshot", "--days", "-3"])).toBe(true)
})

test("a path and the json flag are read off the words", () => {
  const said = readIn(["health-snapshot", "--path", "~/Downloads/export.zip", "--json"])
  expect("refused" in said).toBe(false)
  if ("refused" in said) return
  expect(said.path).toBe("~/Downloads/export.zip")
  expect(said.json).toBe(true)
})

test("the window reaches a day further back than the days asked for", () => {
  const nowMs = Date.parse("2026-09-03T12:00:00.000Z")
  expect(sinceDay(1, nowMs)).toBe("2026-09-01")
  expect(sinceDay(14, nowMs)).toBe("2026-08-19")
})

test("a formatted snapshot becomes one report line for each of its lines", () => {
  expect(linesOf("one\ntwo\n")).toEqual(["one", "two"])
  expect(linesOf("one\n\n")).toEqual(["one"])
  expect(linesOf("")).toEqual([])
})
