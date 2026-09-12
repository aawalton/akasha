import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Cost, Spawned } from "akasha/checks/modules/cost/check-cost.module.code.ts"
import { costSpawned, recordCost } from "akasha/checks/modules/cost/check-cost.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const MIB = 1024 * 1024

const PAGE = "one.module.ts"

const FILLING = "one.module.entries.uncommitted.jsonl"

const HELD = "{}\n"

const HOLDER = "held-by"

const GONE = "1"

const scratch = scratchWorld()

afterAll(scratch.sweep)

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

function seeded(): string {
  const root = scratch.rootFor("check-cost-")
  writeFileSync(join(root, PAGE), "", "utf8")
  writeFileSync(join(root, FILLING), HELD, "utf8")
  return root
}

function turnAt(root: string): string {
  return `${join(root, FILLING)}.lock`
}

function turnLeftBy(root: string, mark: string): string {
  const turn = turnAt(root)
  mkdirSync(turn)
  writeFileSync(join(turn, HOLDER), mark, "utf8")
  return turn
}

function oneCost(): Cost {
  return costSpawned(spawned(MIB))
}

test("a writer reads how full a file is and appends to that file under one turn it gives up after", () => {
  const root = seeded()
  const cost = oneCost()
  expect(recordCost(root, PAGE, cost)).toBe(FILLING)
  expect(readFileSync(join(root, FILLING), "utf8")).toBe(`${HELD}${JSON.stringify(cost)}\n`)
  expect(existsSync(turnAt(root))).toBe(false)
})

test("a turn over the file is taken before the line lands, and a turn left by a process that is gone is broken first", () => {
  const root = seeded()
  const turn = turnLeftBy(root, `${String(process.pid)} ${GONE}`)
  expect(existsSync(turn)).toBe(true)
  const cost = oneCost()
  expect(recordCost(root, PAGE, cost)).toBe(FILLING)
  expect(readFileSync(join(root, FILLING), "utf8")).toBe(`${HELD}${JSON.stringify(cost)}\n`)
  expect(existsSync(turn)).toBe(false)
})
