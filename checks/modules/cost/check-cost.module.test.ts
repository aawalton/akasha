import { expect, test } from "bun:test"
import type { Spawned } from "akasha/checks/modules/cost/check-cost.module.code.ts"
import { costSpawned } from "akasha/checks/modules/cost/check-cost.module.code.ts"

const MIB = 1024 * 1024

function spawned(peakBytes: number, baselineBytes: number | null): Spawned {
  return {
    runId: "01a0917b-4d0b-7000-9f2a-6c1d4e2c9b70",
    ranAt: "2026-09-12T00:00:00.000Z",
    phase: "test",
    ran: "akasha/one.module.test.ts",
    wallMs: 1200,
    cpuSeconds: 1.2345,
    peakBytes,
    baselineBytes,
    refusals: 0,
  }
}

test("the memory a spawned run added is its peak over the memory the harness holds", () => {
  const cost = costSpawned(spawned(200 * MIB, 150 * MIB))
  expect(cost.peakBytes).toBe(200 * MIB)
  expect(cost.residentBeforeBytes).toBe(150 * MIB)
  expect(cost.peakAddedBytes).toBe(50 * MIB)
  expect(cost.peakMeasured).toBe(true)
})

test("a run peaking under the memory the harness holds added nothing", () => {
  const cost = costSpawned(spawned(100 * MIB, 150 * MIB))
  expect(cost.residentBeforeBytes).toBe(150 * MIB)
  expect(cost.peakAddedBytes).toBe(0)
  expect(cost.peakMeasured).toBe(true)
})

test("a run stating no held memory holds none and added its whole peak", () => {
  const cost = costSpawned(spawned(200 * MIB, null))
  expect(cost.peakBytes).toBe(200 * MIB)
  expect(cost.residentBeforeBytes).toBe(0)
  expect(cost.peakAddedBytes).toBe(200 * MIB)
  expect(cost.peakMeasured).toBe(false)
})

test("every second a spawned run spent is a child's", () => {
  const cost = costSpawned(spawned(MIB, 0))
  expect(cost.cpuSeconds).toBe(0)
  expect(cost.childCpuSeconds).toBe(1.234)
  expect(cost.readCalls).toBe(0)
  expect(cost.writeCalls).toBe(0)
  expect(cost.readBytes).toBe(0)
  expect(cost.pathsChanged).toBe(0)
})
