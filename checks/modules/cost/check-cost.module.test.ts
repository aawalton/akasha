import { expect, test } from "bun:test"
import type { Spawned } from "akasha/checks/modules/cost/check-cost.module.code.ts"
import { costSpawned } from "akasha/checks/modules/cost/check-cost.module.code.ts"

const MIB = 1024 * 1024

function spawned(peakBytes: number, peakMeasured = true): Spawned {
  return {
    runId: "01a0917b-4d0b-7000-9f2a-6c1d4e2c9b70",
    ranAt: "2026-09-12T00:00:00.000Z",
    phase: "test",
    ran: "akasha/one.module.test.ts",
    wallMs: 1200,
    cpuSeconds: 1.2345,
    peakBytes,
    peakMeasured,
    refusals: 0,
  }
}

test("a child starts holding nothing, so the memory a spawned run added is its whole peak", () => {
  const cost = costSpawned(spawned(200 * MIB))
  expect(cost.peakBytes).toBe(200 * MIB)
  expect(cost.residentBeforeBytes).toBe(0)
  expect(cost.peakAddedBytes).toBe(200 * MIB)
})

test("a spawned run's peak is measured where the run that spawned it measured that peak", () => {
  expect(costSpawned(spawned(200 * MIB, true)).peakMeasured).toBe(true)
})

test("a spawned run's peak is unmeasured where the run that spawned it measured nothing", () => {
  expect(costSpawned(spawned(200 * MIB, false)).peakMeasured).toBe(false)
})

test("every second a spawned run spent is a child's", () => {
  const cost = costSpawned(spawned(MIB))
  expect(cost.cpuSeconds).toBe(0)
  expect(cost.childCpuSeconds).toBe(1.234)
  expect(cost.readCalls).toBe(0)
  expect(cost.writeCalls).toBe(0)
  expect(cost.readBytes).toBe(0)
  expect(cost.pathsChanged).toBe(0)
})
