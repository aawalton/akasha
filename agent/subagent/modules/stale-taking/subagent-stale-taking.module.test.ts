import { expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import {
  type Judged,
  pagesIn,
  STALE,
} from "akasha/agent/subagent/modules/census/subagent-census.module.code.ts"
import {
  ALL_GONE,
  type ProcEntries,
  SWEEP_HELD,
  stoppedTaken,
  sweepLockIn,
  TAKE,
  takenAway,
} from "akasha/agent/subagent/modules/stale-taking/subagent-stale-taking.module.code.ts"
import {
  ACTS,
  GONE,
  landings,
  stopPut,
  there,
  threePaged,
  world,
  worldWith,
} from "akasha/command/pages/agent/subagent-sweep/agent-subagent-sweep.command.test-fixtures.ts"
import { exclusively } from "akasha/file/modules/exclusive/exclusive.module.code.ts"

function staleIn(root: string): readonly Judged[] {
  return pagesIn(root).map((page) => ({ page, verdict: STALE, pids: [], why: "it is done" }))
}

test("a take the lock lets through names each stale page to the landing", async () => {
  const { root, at } = worldWith()
  const held = landings()
  const said = await takenAway(root, staleIn(root), held.landing, [])
  expect(said.code).toBe(0)
  expect(said.report).toContain(`${at} went`)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at } }]])
  world.sweep()
})

test("a take while another sweep holds the lock takes nothing and says so", async () => {
  const { root, at } = worldWith()
  const held = landings()
  const said = await exclusively(sweepLockIn(root), () =>
    takenAway(root, staleIn(root), held.landing, [])
  )
  expect(said.code).toBe(3)
  expect(said.refusals).toEqual([SWEEP_HELD])
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a take after the other sweep let go of the lock takes the page", async () => {
  const { root, at } = worldWith()
  const held = landings()
  exclusively(sweepLockIn(root), () => undefined)
  const said = await takenAway(root, staleIn(root), held.landing, [])
  expect(said.code).toBe(0)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at } }]])
  world.sweep()
})

test("a page gone before its take is left out, so nothing is taken twice", async () => {
  const { root, at } = worldWith()
  const stale = staleIn(root)
  rmSync(join(root, at))
  const held = landings()
  const said = await takenAway(root, stale, held.landing, [])
  expect(said.code).toBe(0)
  expect(said.report).toEqual([ALL_GONE])
  expect(held.asked()).toEqual([])
  world.sweep()
})

test("a take that threw once it held the lock carries the fault out and lets the lock go", async () => {
  const { root } = worldWith()
  const threw = (): never => {
    throw new Error("the landing broke")
  }
  await expect(takenAway(root, staleIn(root), threw, [])).rejects.toThrow("the landing broke")
  const held = landings()
  const said = await takenAway(root, staleIn(root), held.landing, [])
  expect(said.code).toBe(0)
  world.sweep()
})

function counted(seen: ReturnType<ProcEntries>): { entries: ProcEntries; asked: () => number } {
  let asked = 0
  return {
    entries: () => {
      asked += 1
      return seen
    },
    asked: () => asked,
  }
}

test("a take of stopped pages finding no stop reads no process, lands nothing and says nothing", async () => {
  const { root, at } = worldWith()
  const held = landings()
  const scan = counted(GONE)
  const said = await stoppedTaken(root, held.landing, scan.entries)
  expect(said).toEqual({ report: [], refusals: [], code: 0 })
  expect(scan.asked()).toBe(0)
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a stopped page no live process acts under goes on the stop alone", async () => {
  const { root, at } = worldWith()
  stopPut(root, at)
  const held = landings()
  const said = await stoppedTaken(root, held.landing, counted([]).entries)
  expect(said.code).toBe(0)
  expect(said.report).toContain(`${at} went`)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at } }]])
  expect(held.said().join("\n")).toContain("stopped from the agents panel")
  world.sweep()
})

test("a page with no stop beside it stays though no process at all carries its seat", async () => {
  const { root, gone } = threePaged()
  stopPut(root, gone)
  const held = landings()
  const said = await stoppedTaken(root, held.landing, counted([]).entries)
  expect(said.code).toBe(0)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at: gone } }]])
  world.sweep()
})

test("a stopped page a live process acts under is left where it is", async () => {
  const { root, at } = worldWith()
  stopPut(root, at)
  const held = landings()
  const said = await stoppedTaken(root, held.landing, counted(ACTS).entries)
  expect(said.code).toBe(0)
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a stopped page another sweep is taking is left for that sweep", async () => {
  const { root, at } = worldWith()
  stopPut(root, at)
  const held = landings()
  const said = await exclusively(sweepLockIn(root), () =>
    stoppedTaken(root, held.landing, counted([]).entries)
  )
  expect(said.refusals).toEqual([SWEEP_HELD])
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})
