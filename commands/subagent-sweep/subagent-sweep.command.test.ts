import { expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { said as gitIn } from "@akasha/git/git-running"
import { subagentSweep } from "./subagent-sweep.command.code.ts"
import {
  AGAIN,
  agentIdOf,
  CHILD,
  entry,
  givenIn,
  logPut,
  OTHER_ID,
  OWN,
  paged,
  pathOf,
  SEAT_ID,
  seated,
  TASK,
  takeLine,
  there,
} from "./subagent-sweep.command.test-fixtures.ts"

const ACTING = agentIdOf(SEAT_ID, OWN)

const world = scratchWorld()

function worldWith(): { root: string; base: string; at: string } {
  const root = seated(world.rootFor("subagent-sweep-"))
  return {
    root,
    base: world.rootFor("subagent-sweep-logs-"),
    at: paged(root, "akasha", OWN, ACTING),
  }
}

const GONE = [entry({ agentId: OTHER_ID, cmdline: CHILD, pid: 8 })]

const ALIVE = [entry({ agentId: SEAT_ID, cmdline: CHILD, pid: 8 })]

const ACTS = [entry({ agentId: SEAT_ID, actingAgentId: ACTING, cmdline: TASK, pid: 9 })]

test("a page whose agent no live process answers for is named stale", async () => {
  const { root, base } = worldWith()
  const said = await subagentSweep([], givenIn(root), GONE, base)
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(`STALE`)
  expect(said.report.join("\n")).toContain(`agent ${ACTING}`)
  world.sweep()
})

test("a page a live process acts under is named working rather than stale", async () => {
  const { root, base } = worldWith()
  const said = (await subagentSweep([], givenIn(root), ACTS, base)).report.join("\n")
  expect(said).toContain("1 subagent page(s): 1 working, 0 stale, 0 undetermined")
  expect(said).toContain("pid 9 answers")
  expect(said).not.toMatch(/^STALE/m)
  world.sweep()
})

test("a page a live process acts under is left alone by a run told to remove", async () => {
  const { root, base, at } = worldWith()
  const was = gitIn(root, ["rev-parse", "HEAD"])
  const said = await subagentSweep(["--remove"], givenIn(root), ACTS, base)
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("no page was judged STALE, so nothing went")
  expect(there(root, at)).toBe(true)
  expect(gitIn(root, ["rev-parse", "HEAD"])).toBe(was)
  world.sweep()
})

test("a page nothing settles is undetermined and is left alone by a run told to remove", async () => {
  const { root, base, at } = worldWith()
  const said = await subagentSweep(["--remove"], givenIn(root), ALIVE, base)
  expect(said.report.join("\n")).toContain("UNDETERMINED")
  expect(said.report.join("\n")).toContain("no page was judged STALE, so nothing went")
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a run naming nothing writes nothing, though the census called a page stale", async () => {
  const { root, base, at } = worldWith()
  const was = gitIn(root, ["rev-parse", "HEAD"])
  const said = await subagentSweep([], givenIn(root), GONE, base)
  expect(said.report.join("\n")).toContain("wrote nothing")
  expect(said.report.join("\n")).toContain("Say `--remove`")
  expect(there(root, at)).toBe(true)
  expect(gitIn(root, ["rev-parse", "HEAD"])).toBe(was)
  world.sweep()
})

test("a run told to remove takes the stale page away and says so", async () => {
  const { root, base, at } = worldWith()
  const was = gitIn(root, ["rev-parse", "HEAD"])
  const said = await subagentSweep(["--remove"], givenIn(root), GONE, base)
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(`${at} went`)
  expect(there(root, at)).toBe(false)
  expect(gitIn(root, ["rev-parse", "HEAD"])).not.toBe(was)
  world.sweep()
})

test("the commit says why each page went", async () => {
  const { root, base } = worldWith()
  await subagentSweep(["--remove"], givenIn(root), GONE, base)
  const said = gitIn(root, ["log", "-1", "--pretty=%B"])
  expect(said).toContain("1 subagent page(s) go")
  expect(said).toContain("no process at all carries its seat's agent id")
  world.sweep()
})

test("a take-down the log says was refused is stale and goes", async () => {
  const { root, base, at } = worldWith()
  logPut(base, SEAT_ID, [takeLine("akasha", OWN)])
  const said = await subagentSweep(["--remove"], givenIn(root), ALIVE, base)
  expect(said.code).toBe(0)
  expect(there(root, at)).toBe(false)
  world.sweep()
})

test("the stale go and the working and undetermined remain in one run", async () => {
  const root = seated(world.rootFor("subagent-sweep-"))
  const base = world.rootFor("subagent-sweep-logs-")
  const working = paged(root, "akasha", OWN, ACTING)
  const held = paged(root, "akasha", AGAIN, agentIdOf(SEAT_ID, AGAIN))
  const gone = paged(root, "thea", OWN, agentIdOf(OTHER_ID, OWN))
  const said = await subagentSweep(["--remove"], givenIn(root), ACTS, base)
  expect(said.code).toBe(0)
  expect(there(root, working)).toBe(true)
  expect(there(root, held)).toBe(true)
  expect(there(root, gone)).toBe(false)
  world.sweep()
})

test("a word this takes no flag for refuses the whole run and writes nothing", async () => {
  const { root, base, at } = worldWith()
  for (const word of ["--all", "--force", pathOf("akasha", OWN)]) {
    const said = await subagentSweep([word], givenIn(root), GONE, base)
    expect(said.code).toBe(1)
    expect(said.refusals.join("\n")).toContain("is not a word this takes")
  }
  expect(there(root, at)).toBe(true)
  world.sweep()
})
