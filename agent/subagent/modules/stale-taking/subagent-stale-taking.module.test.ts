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
  SWEEP_HELD,
  sweepLockIn,
  TAKE,
  takenAway,
} from "akasha/agent/subagent/modules/stale-taking/subagent-stale-taking.module.code.ts"
import {
  landings,
  there,
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
