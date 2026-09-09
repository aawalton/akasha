import { expect, test } from "bun:test"
import { linesFor, percentileOf, ratedIn } from "./landing-throughput.performance.code.ts"

const SORTED: readonly number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

test("a percentile of nothing is nought rather than a throw", () => {
  expect(percentileOf([], 50)).toBe(0)
})

test("a percentile reads the sorted run at that fraction", () => {
  expect(percentileOf(SORTED, 50)).toBe(60)
  expect(percentileOf(SORTED, 90)).toBe(100)
})

test("a percentile past the run's end reads the last rather than nothing", () => {
  expect(percentileOf(SORTED, 100)).toBe(100)
})

test("a rate over no time is nought rather than infinite", () => {
  expect(ratedIn(40, 0)).toBe(0)
})

test("a rate is the landings over the seconds", () => {
  expect(ratedIn(40, 2)).toBe(20)
})

test("the lines say the lanes, the landings, the wall time and the rate", () => {
  const said = linesFor({ lanes: 40, landed: 40, wallSeconds: 2, lane: [...SORTED] })
  expect(said).toContain("lanes\t40")
  expect(said).toContain("landed\t40")
  expect(said).toContain("wall\t2.00s")
  expect(said).toContain("rate\t20.0/s")
  expect(said).toContain("lane max\t100ms")
})

test("the lines sort the lane times rather than trusting the order they arrived in", () => {
  const said = linesFor({ lanes: 3, landed: 3, wallSeconds: 1, lane: [90, 10, 50] })
  expect(said).toContain("lane max\t90ms")
})
