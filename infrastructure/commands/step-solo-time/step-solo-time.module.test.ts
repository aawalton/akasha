import { expect, test } from "bun:test"
import { computeSoloMs, type StepSpan } from "./step-solo-time.module.code.ts"

function span(from: string, to: string): StepSpan {
  return { startedAt: `2026-09-03T00:00:${from}Z`, completedAt: `2026-09-03T00:00:${to}Z` }
}

test("a step running with nothing beside it holds its whole span", () => {
  expect(computeSoloMs([span("00", "10")])).toEqual([10_000])
})

test("time counts as solo only where exactly one step is running", () => {
  expect(computeSoloMs([span("00", "20"), span("05", "15")])).toEqual([10_000, 0])
})

test("a step that never ran alone holds zero rather than nothing", () => {
  expect(computeSoloMs([span("00", "10"), span("00", "10")])).toEqual([0, 0])
})

test("a step whose span is unreadable holds no solo time", () => {
  expect(computeSoloMs([{ startedAt: "no", completedAt: "2026-09-03T00:00:10Z" }])).toEqual([
    undefined,
  ])
})

test("a step ending before it starts holds no solo time", () => {
  expect(computeSoloMs([span("10", "00")])).toEqual([undefined])
})

test("a step starting at the moment another ends leaves no solo gap between them", () => {
  expect(computeSoloMs([span("00", "10"), span("10", "20")])).toEqual([10_000, 10_000])
})
