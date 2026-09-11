import { expect, test } from "bun:test"
import { join } from "node:path"
import {
  cyclomaticLines,
  readIn,
  summaryOf,
} from "akasha/commands/modules/complexity-rowing/complexity-rowing.module.code.ts"
import { answeredBy } from "akasha/commands/modules/report-answering/report-answering.module.code.ts"

const OWN = join(import.meta.dir, "complexity-rowing.module.code.ts")

const EVERY = { file: true, threshold: true }

const ROLLED = { file: false, threshold: false }

function rows(argv: readonly string[]): readonly string[] {
  const read = readIn(argv, EVERY)
  if ("refused" in read) throw new Error(read.refused.join(" "))
  return answeredBy(() => cyclomaticLines(read, "/repo")).report
}

test("a word this takes none of is refused by name", () => {
  const read = readIn(["cognitive"], EVERY)

  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused[0]).toContain("`cognitive`")
})

test("a flag this takes none of is refused rather than read as a word", () => {
  const read = readIn(["--cyclomatic"], EVERY)

  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused[0]).toContain("`--cyclomatic`")
})

test("a count that is no whole number is refused, naming what was said", () => {
  const read = readIn(["--top", "two"], EVERY)

  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused[0]).toContain("`two`")
})

test("a command taking no file refuses one, naming the flags it does take", () => {
  const read = readIn(["--file", "tools/one.ts"], ROLLED)

  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused[0]).toContain("--file")
})

test("a command taking no threshold refuses one", () => {
  const read = readIn(["--threshold", "5"], ROLLED)

  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused[0]).toContain("--threshold")
})

test("what was said is read into the flags", () => {
  const read = readIn(["--file", "a.ts", "--threshold", "40", "--top", "3", "--json"], EVERY)

  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read).toEqual({ file: "a.ts", threshold: 40, top: 3, asJson: true })
})

test("a run over one file answers a row for each of its functions", () => {
  const said = rows(["--file", OWN])

  expect(said.length).toBeGreaterThan(0)
  expect(said[0]).toContain("\t")
})

test("rows are ordered worst first, so the highest complexity leads", () => {
  const cc = rows(["--file", OWN]).map((one) => Number(one.split("\t")[3]))

  expect(cc).toEqual([...cc].sort((a, b) => b - a))
})

test("a threshold no row reaches answers empty rather than refusing", () => {
  expect(rows(["--file", OWN, "--threshold", "100000"])).toEqual([])
})

test("the top keeps that many rows", () => {
  expect(rows(["--file", OWN, "--top", "2"]).length).toBe(2)
})

test("the json answer is one line", () => {
  const said = rows(["--file", OWN, "--json"])

  expect(said.length).toBe(1)
  expect(String(said[0]).startsWith('{"rows":')).toBe(true)
})

test("a file that will not open is gone by rather than refused", () => {
  expect(rows(["--file", "/nowhere/at/all.ts"])).toEqual([])
})

test("a summary over nothing counts nothing rather than throwing", () => {
  expect(summaryOf([])).toEqual({ p50: 0, p75: 0, p90: 0, p95: 0, p99: 0, max: 0, count: 0 })
})
