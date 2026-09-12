import { expect, test } from "bun:test"
import { join } from "node:path"
import {
  cyclomaticLines,
  summaryOf,
  type Wanted,
} from "akasha/commands/modules/complexity-rowing/complexity-rowing.module.code.ts"
import { reportedBy } from "akasha/commands/modules/report-answering/report-answering.module.code.ts"

const OWN = join(import.meta.dir, "complexity-rowing.module.code.ts")

function rows(wanted: Wanted): readonly string[] {
  return reportedBy(() => cyclomaticLines(wanted, "/repo")).report
}

test("a run over one file answers a row for each of its functions", () => {
  const said = rows({ json: false, filePath: OWN })

  expect(said.length).toBeGreaterThan(0)
  expect(said[0]).toContain("\t")
})

test("rows are ordered worst first, so the highest complexity leads", () => {
  const cc = rows({ json: false, filePath: OWN }).map((one) => Number(one.split("\t")[3]))

  expect(cc).toEqual([...cc].sort((a, b) => b - a))
})

test("a threshold no row reaches answers empty rather than refusing", () => {
  expect(rows({ json: false, filePath: OWN, threshold: 100000 })).toEqual([])
})

test("the top keeps that many rows", () => {
  expect(rows({ json: false, filePath: OWN, top: 2 }).length).toBe(2)
})

test("the json answer is one line", () => {
  const said = rows({ json: true, filePath: OWN })

  expect(said.length).toBe(1)
  expect(String(said[0]).startsWith('{"rows":')).toBe(true)
})

test("a file that will not open is gone by rather than refused", () => {
  expect(rows({ json: false, filePath: "/nowhere/at/all.ts" })).toEqual([])
})

test("a summary over nothing counts nothing rather than throwing", () => {
  expect(summaryOf([])).toEqual({ p50: 0, p75: 0, p90: 0, p95: 0, p99: 0, max: 0, count: 0 })
})
