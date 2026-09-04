import { expect, test } from "bun:test"
import { join } from "node:path"
import type { Given } from "../../calling/calling.module.code.ts"
import { complexity, readIn, summaryOf } from "./complexity.command.code.ts"

const OWN = join(import.meta.dir, "complexity.command.code.ts")

function given(root: string): Given {
  return { root, calledAs: "akasha complexity", from: root, writer: null, agentId: null }
}

test("a call naming no act is refused, saying the acts it carries", () => {
  const read = readIn([])

  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused[0]).toContain("cyclomatic")
  expect(read.refused[0]).toContain("report")
})

test("an act this does not carry is refused by name", () => {
  const read = readIn(["cognitive"])

  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused[0]).toContain("`cognitive`")
})

test("one call names one act", () => {
  const read = readIn(["cyclomatic", "halstead"])

  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused[0]).toContain("one act")
})

test("a flag this does not take is refused rather than read as an act", () => {
  const read = readIn(["--cyclomatic"])

  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused[0]).toContain("`--cyclomatic`")
})

test("a count that is no whole number is refused, naming what was said", () => {
  const read = readIn(["cyclomatic", "--top", "two"])

  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused[0]).toContain("`two`")
})

test("the report is taken over the whole workspace, so it takes no file", () => {
  const read = readIn(["report", "--file", "tools/one.ts"])

  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused[0]).toContain("--file")
})

test("the report counts every row, so it takes no threshold", () => {
  const read = readIn(["report", "--threshold", "5"])

  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused[0]).toContain("--threshold")
})

test("what was said is read into the act and its flags", () => {
  const read = readIn([
    "maintainability",
    "--file",
    "a.ts",
    "--threshold",
    "40",
    "--top",
    "3",
    "--json",
  ])

  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read).toEqual({
    act: "maintainability",
    file: "a.ts",
    threshold: 40,
    top: 3,
    asJson: true,
  })
})

test("a run over one file answers a row for each of its functions", () => {
  const said = complexity(["cyclomatic", "--file", OWN], given("/repo"))

  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report.length).toBeGreaterThan(0)
  expect(said.report[0]).toContain("\t")
})

test("rows stand worst first, so the highest complexity leads", () => {
  const said = complexity(["cyclomatic", "--file", OWN], given("/repo"))
  const cc = said.report.map((one) => Number(one.split("\t")[3]))

  expect(cc).toEqual([...cc].sort((a, b) => b - a))
})

test("a threshold no row reaches answers empty rather than refusing", () => {
  const said = complexity(["cyclomatic", "--file", OWN, "--threshold", "100000"], given("/repo"))

  expect(said.code).toBe(0)
  expect(said.report).toEqual([])
})

test("the top keeps that many rows", () => {
  const said = complexity(["cyclomatic", "--file", OWN, "--top", "2"], given("/repo"))

  expect(said.report.length).toBe(2)
})

test("the json answer is one line", () => {
  const said = complexity(["cyclomatic", "--file", OWN, "--json"], given("/repo"))

  expect(said.report.length).toBe(1)
  expect(String(said.report[0]).startsWith('{"rows":')).toBe(true)
})

test("a file that will not open is passed over rather than refused", () => {
  const said = complexity(["cyclomatic", "--file", "/nowhere/at/all.ts"], given("/repo"))

  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report).toEqual([])
})

test("a summary over nothing counts nothing rather than throwing", () => {
  expect(summaryOf([])).toEqual({ p50: 0, p75: 0, p90: 0, p95: 0, p99: 0, max: 0, count: 0 })
})
