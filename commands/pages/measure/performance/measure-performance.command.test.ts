import { expect, test } from "bun:test"
import {
  noPerformance,
  thereAre,
} from "akasha/commands/pages/measure/performance/measure-performance.command.code.ts"

const THERE: readonly string[] = ["landing-throughput"]

test("a call naming one performance there reads that performance", () => {
  expect(noPerformance("landing-throughput", THERE)).toEqual([])
})

test("a call naming no performance is refused with every performance there is", () => {
  expect(thereAre(THERE)).toContain("the performances there are")
  expect(thereAre(THERE)).toContain("landing-throughput")
})

test("a word naming no performance is refused", () => {
  expect(noPerformance("nowhere", THERE)[0]).toContain("is no performance")
})
