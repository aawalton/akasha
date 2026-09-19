import { expect, test } from "bun:test"
import { mkdtempSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { ProcLivenessEntry } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import type { Stray } from "akasha/agent/modules/stray-process/stray-process.module.code.ts"
import {
  burnedTicksIn,
  clockSaid,
  keptAt,
  keptRead,
  keptWrite,
  lineOf,
  type Swept,
  saidOf,
  sweptOnce,
  type TimesOf,
  withDescendants,
} from "akasha/agent/modules/stray-sweeping/stray-sweeping.module.code.ts"

const SCRATCH_AT = "/var/tmp"

const SEAT = "01a09581-cb35-7000-b00f-7156d6b3ce13"

const ACTING = `${SEAT}--a05867e64f733ddec`

const OTHER = `${SEAT}--b17968f54e844fe21`

const times: TimesOf = () => ({ ranMs: 4_200_000, burnedMs: 4_140_000 })

const nowhere: TimesOf = () => null

const STAT = "7 (bash) S 1 7 7 0 -1 4194304 100 0 0 0 300 60 0 0 20 0 1 0 999"

const SHELL: Stray = { pid: 10, actingAgentId: ACTING, cmdline: "bash -c sleep 900" }

function entry(pid: number, ppid: number, cmdline: string, acting?: string): ProcLivenessEntry {
  return { agentId: SEAT, actingAgentId: acting, cmdline, pid, ppid }
}

test("a line names the process, its subagent, its times and its command line", () => {
  expect(lineOf({ pid: 2749479, actingAgentId: ACTING, cmdline: "sleep 900" }, times)).toBe(
    `2749479  ${ACTING}  ran 1:10:00  burned 1:09:00  sleep 900`
  )
})

test("a process whose times will not be read is named with its times left unsaid", () => {
  expect(lineOf(SHELL, nowhere)).toContain("ran ?  burned ?")
})

test("a span is said in hours, minutes and seconds", () => {
  expect(clockSaid(4_200_000)).toBe("1:10:00")
  expect(clockSaid(-5)).toBe("0:00:00")
})

test("the processor time a process took is read off its own line under /proc", () => {
  expect(burnedTicksIn(STAT)).toBe(360)
  expect(burnedTicksIn("no line like that")).toBe(null)
})

test("a child stating no acting agent of its own goes with the shell it hangs off", () => {
  const whole = withDescendants(
    [SHELL],
    [entry(10, 1, "bash -c sleep 900", ACTING), entry(11, 10, "sleep 900")]
  )

  expect(whole.map((one) => one.pid)).toEqual([10, 11])
  expect(whole[1]?.actingAgentId).toBe(ACTING)
})

test("a child stating an acting agent of its own is left to the reading", () => {
  const whole = withDescendants(
    [SHELL],
    [entry(10, 1, "bash -c sleep 900", ACTING), entry(11, 10, "bun run thing.ts", OTHER)]
  )

  expect(whole.map((one) => one.pid)).toEqual([10])
})

test("a descendant further down goes as well", () => {
  const whole = withDescendants(
    [SHELL],
    [entry(10, 1, "bash", ACTING), entry(11, 10, "bash -c"), entry(12, 11, "sleep 900")]
  )

  expect(whole.map((one) => one.pid)).toEqual([10, 11, 12])
})

test("a sweep ends the processes the reading named and their descendants and nothing else", async () => {
  const asked: number[][] = []
  const swept = await sweptOnce(
    () => [
      entry(10, 1, "bash -c sleep 900", ACTING),
      entry(11, 10, "sleep 900"),
      entry(12, 1, "bun run other.ts", OTHER),
    ],
    () => Promise.resolve({ strays: [SHELL], unread: [] }),
    times,
    (pids) => {
      asked.push([...pids])
      return Promise.resolve(undefined)
    }
  )

  expect(asked).toEqual([[10, 11]])
  expect(swept.ended.map((one) => one.pid)).toEqual([10, 11])
})

test("a process's times are read before that process is ended", async () => {
  const order: string[] = []
  await sweptOnce(
    () => [entry(10, 1, "bash -c sleep 900", ACTING)],
    () => Promise.resolve({ strays: [SHELL], unread: [] }),
    (pid) => {
      order.push(`read ${String(pid)}`)
      return { ranMs: 1000, burnedMs: 0 }
    },
    (pids) => {
      order.push(`end ${pids.join(",")}`)
      return Promise.resolve(undefined)
    }
  )

  expect(order).toEqual(["read 10", "end 10"])
})

test("a sweep that read every subagent and found no stray signals nothing and says nothing", async () => {
  let asked = 0
  const swept = await sweptOnce(
    () => [],
    () => Promise.resolve({ strays: [], unread: [] }),
    times,
    () => {
      asked += 1
      return Promise.resolve(undefined)
    }
  )

  expect(asked).toBe(0)
  expect(saidOf(swept)).toEqual([])
})

test("a sweep that could read no subagent says so rather than passing for a clean sweep", async () => {
  const swept = await sweptOnce(
    () => [],
    () => Promise.resolve({ strays: [], unread: [ACTING] }),
    times,
    () => Promise.resolve(undefined)
  )

  expect(swept.ended).toEqual([])
  expect(saidOf(swept)).toEqual([`1 subagent(s) could not be read: ${ACTING}`])
})

function homeMade(): string {
  return mkdtempSync(join(SCRATCH_AT, "akasha-stray-sweeping-"))
}

function tick(home: string, unread: readonly string[]): readonly string[] {
  const swept: Swept = { ended: [], said: [], unread }
  const lines = saidOf(swept, keptRead(home))
  keptWrite(unread, home)
  return lines
}

test("the set a tick could not read is kept where the workstation services keep their state", () => {
  expect(keptAt("/h")).toBe("/h/.local/state/workstation-services/stray-sweep-unread.json")
})

test("the same set of subagents that could not be read is said once rather than on every tick", () => {
  const home = homeMade()

  expect(tick(home, [ACTING])).toEqual([`1 subagent(s) could not be read: ${ACTING}`])
  expect(tick(home, [ACTING])).toEqual([])
  expect(tick(home, [ACTING])).toEqual([])
})

test("a set that gains a subagent is said again", () => {
  const home = homeMade()

  tick(home, [ACTING])

  expect(tick(home, [ACTING, OTHER])).toEqual([
    `2 subagent(s) could not be read: ${ACTING}, ${OTHER}`,
  ])
})

test("a set that empties says so, and then says nothing", () => {
  const home = homeMade()

  tick(home, [ACTING])

  expect(tick(home, [])).toEqual(["every subagent a live process names was read"])
  expect(tick(home, [])).toEqual([])
})

test("a kept set that will not be read leaves the tick saying what it could not read", () => {
  const home = homeMade()

  tick(home, [ACTING])
  writeFileSync(keptAt(home), "this is no json")

  expect(tick(home, [ACTING])).toEqual([`1 subagent(s) could not be read: ${ACTING}`])
})
