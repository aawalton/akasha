import { expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import {
  censusOf,
  judgedOver,
  pagesIn,
  STALE,
  seenIn,
  staleAmong,
  takenDownIn,
  UNDETERMINED,
  WORKING,
} from "./subagent-census.module.code.ts"
import {
  AGAIN,
  agentIdOf,
  CHILD,
  entry,
  logPut,
  OTHER_ID,
  OWN,
  pagePut,
  SEAT_ID,
  STAMPED,
  TASK,
  takeLine,
  writeLine,
} from "./subagent-census.module.test-fixtures.ts"

test("a take-down is read whether or not its line opens with the time it was written", () => {
  const base = world.rootFor("subagent-census-logs-")
  logPut(base, SEAT_ID, [takeLine("akasha", OWN), `${STAMPED} ${takeLine("akasha", AGAIN)}`])
  expect([...takenDownIn(base)].sort()).toEqual([`akasha ${OWN}`, `akasha ${AGAIN}`])
  world.sweep()
})

test("a put-up is no take-down whether or not its line opens with a time", () => {
  const base = world.rootFor("subagent-census-logs-")
  logPut(base, SEAT_ID, [writeLine("akasha", OWN), `${STAMPED} ${writeLine("akasha", AGAIN)}`])
  expect(takenDownIn(base).size).toBe(0)
  world.sweep()
})

const ACTING = agentIdOf(SEAT_ID, OWN)

const world = scratchWorld()

function rooted(): string {
  const root = world.rootFor("subagent-census-")
  pagePut(root, "akasha", OWN, ACTING)
  return root
}

function judgedIn(root: string, entries: Parameters<typeof seenIn>[0], baseDir?: string) {
  return judgedOver(pagesIn(root), seenIn(entries, baseDir))
}

test("a page is read with the seat and the agent id its body states", () => {
  const root = rooted()
  const page = pagesIn(root)[0]
  expect(page?.slug).toBe(`akasha-${OWN}`)
  expect(page?.seatName).toBe("akasha")
  expect(page?.agentId).toBe(ACTING)
  expect(page?.seatId).toBe(SEAT_ID)
  expect(page?.own).toBe(OWN)
  world.sweep()
})

test("a live process acting under a page's agent id reads that page as working", () => {
  const root = rooted()
  const judged = judgedIn(
    root,
    [entry({ agentId: SEAT_ID, actingAgentId: ACTING, cmdline: TASK, pid: 41 })],
    world.rootFor("subagent-census-logs-")
  )
  expect(judged[0]?.verdict).toBe(WORKING)
  expect(judged[0]?.pids).toEqual([41])
  world.sweep()
})

test("a page whose seat is at work and whose agent nothing acts under is undetermined", () => {
  const root = rooted()
  const judged = judgedIn(
    root,
    [entry({ agentId: SEAT_ID, cmdline: CHILD, pid: 9 })],
    world.rootFor("subagent-census-logs-")
  )
  expect(judged[0]?.verdict).toBe(UNDETERMINED)
  expect(judged[0]?.why).toContain("waiting on the model")
  world.sweep()
})

test("a page whose seat runs on no live process is stale", () => {
  const root = rooted()
  const judged = judgedIn(
    root,
    [entry({ agentId: OTHER_ID, cmdline: CHILD, pid: 9 })],
    world.rootFor("subagent-census-logs-")
  )
  expect(judged[0]?.verdict).toBe(STALE)
  expect(judged[0]?.why).toContain("no process at all carries its seat's agent id")
  world.sweep()
})

test("a process carrying the seat's agent id reads the seat as there, cmdline or not", () => {
  const root = rooted()
  const judged = judgedIn(
    root,
    [entry({ agentId: SEAT_ID, cmdline: TASK, pid: 9 })],
    world.rootFor("subagent-census-logs-")
  )
  expect(judged[0]?.verdict).toBe(UNDETERMINED)
  world.sweep()
})

test("a page the take-down log names is stale though its seat is at work", () => {
  const root = rooted()
  const base = world.rootFor("subagent-census-logs-")
  logPut(base, SEAT_ID, [takeLine("akasha", OWN)])
  const judged = judgedIn(root, [entry({ agentId: SEAT_ID, cmdline: CHILD, pid: 9 })], base)
  expect(judged[0]?.verdict).toBe(STALE)
  expect(judged[0]?.why).toContain("take-down ran")
  world.sweep()
})

test("a page a live process acts under is working though the log names its take-down", () => {
  const root = rooted()
  const base = world.rootFor("subagent-census-logs-")
  logPut(base, SEAT_ID, [takeLine("akasha", OWN)])
  const judged = judgedIn(
    root,
    [entry({ agentId: SEAT_ID, actingAgentId: ACTING, cmdline: TASK, pid: 3 })],
    base
  )
  expect(judged[0]?.verdict).toBe(WORKING)
  world.sweep()
})

test("a put-up the log names is no take-down", () => {
  const root = rooted()
  const base = world.rootFor("subagent-census-logs-")
  logPut(base, SEAT_ID, [writeLine("akasha", OWN)])
  expect(takenDownIn(base).size).toBe(0)
  const judged = judgedIn(root, [entry({ agentId: SEAT_ID, cmdline: CHILD, pid: 9 })], base)
  expect(judged[0]?.verdict).toBe(UNDETERMINED)
  world.sweep()
})

test("a take-down named for another subagent is no take-down for this one", () => {
  const root = rooted()
  const base = world.rootFor("subagent-census-logs-")
  logPut(base, SEAT_ID, [takeLine("akasha", AGAIN), takeLine("thea", OWN)])
  const judged = judgedIn(root, [entry({ agentId: SEAT_ID, cmdline: CHILD, pid: 9 })], base)
  expect(judged[0]?.verdict).toBe(UNDETERMINED)
  world.sweep()
})

test("a page stating no agent id is undetermined rather than left out", () => {
  const root = world.rootFor("subagent-census-")
  pagePut(root, "akasha", OWN, "")
  const judged = judgedIn(root, [], world.rootFor("subagent-census-logs-"))
  expect(judged.length).toBe(1)
  expect(judged[0]?.verdict).toBe(UNDETERMINED)
  expect(judged[0]?.why).toContain("no agent id")
  world.sweep()
})

test("only the stale are gathered, and the working and undetermined are not", () => {
  const root = world.rootFor("subagent-census-")
  pagePut(root, "akasha", OWN, ACTING)
  pagePut(root, "akasha", AGAIN, agentIdOf(SEAT_ID, AGAIN))
  pagePut(root, "thea", OWN, agentIdOf(OTHER_ID, OWN))
  const base = world.rootFor("subagent-census-logs-")
  logPut(base, SEAT_ID, [takeLine("akasha", AGAIN)])
  const judged = judgedIn(
    root,
    [entry({ agentId: SEAT_ID, actingAgentId: ACTING, cmdline: TASK, pid: 2 })],
    base
  )
  expect(
    staleAmong(judged)
      .map((one) => one.page.slug)
      .sort()
  ).toEqual([`akasha-${AGAIN}`, `thea-${OWN}`])
  world.sweep()
})

test("the census names the seat, the agent id, what answers and why", () => {
  const root = rooted()
  const said = censusOf(
    judgedIn(
      root,
      [entry({ agentId: SEAT_ID, actingAgentId: ACTING, cmdline: TASK, pid: 77 })],
      world.rootFor("subagent-census-logs-")
    )
  ).join("\n")
  expect(said).toContain("1 subagent page(s): 1 working, 0 stale, 0 undetermined")
  expect(said).toContain("seat akasha")
  expect(said).toContain(`agent ${ACTING}`)
  expect(said).toContain("pid 77 answers")
  world.sweep()
})

test("a root holding no subagents folder is a census of nothing", () => {
  const root = world.rootFor("subagent-census-")
  expect(pagesIn(root)).toEqual([])
  world.sweep()
})
