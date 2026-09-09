import { expect, test } from "bun:test"
import { pagesIn } from "@akasha/seat-system/subagent-census"
import { entry } from "../../../../seat-system/seat-proc-liveness/seat-proc-liveness.module.test-fixtures.ts"
import { scratchWorld } from "../../../modules/scratching/scratching.module.code.ts"
import {
  agentSubagentSweep,
  runningOwnIn,
  type SeatTranscripts,
  TAKE,
} from "./agent-subagent-sweep.command.code.ts"
import {
  AGAIN,
  agentIdOf,
  CHILD,
  givenIn,
  halfReading,
  landings,
  logPut,
  node,
  OTHER_ID,
  OWN,
  paged,
  pathOf,
  reading,
  SEAT_ID,
  saying,
  seated,
  TASK,
  THROWS,
  takeLine,
  there,
  UNREADABLE,
} from "./agent-subagent-sweep.command.test-fixtures.ts"

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

const NOWHERE = "/var/tmp/subagent-sweep-no-transcript.jsonl"

test("a page whose agent no live process answers for is named stale", async () => {
  const { root, base } = worldWith()
  const said = await agentSubagentSweep([], givenIn(root), GONE, base, saying([]))
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(`STALE`)
  expect(said.report.join("\n")).toContain(`agent ${ACTING}`)
  world.sweep()
})

test("a page a live process acts under is named working rather than stale", async () => {
  const { root, base } = worldWith()
  const said = (await agentSubagentSweep([], givenIn(root), ACTS, base, saying([]))).report.join(
    "\n"
  )
  expect(said).toContain("1 subagent page(s): 1 working, 0 stale, 0 undetermined")
  expect(said).toContain("pid 9 answers")
  expect(said).not.toMatch(/^STALE/m)
  world.sweep()
})

test("a page a live process acts under is named to no landing by a run told to remove", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  const said = await agentSubagentSweep(
    ["--remove"],
    givenIn(root),
    ACTS,
    base,
    saying([]),
    held.landing
  )
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("no page was judged STALE, so nothing went")
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a page nothing settles is undetermined and is named to no landing", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  const said = await agentSubagentSweep(
    ["--remove"],
    givenIn(root),
    ALIVE,
    base,
    saying([]),
    held.landing
  )
  expect(said.report.join("\n")).toContain("UNDETERMINED")
  expect(said.report.join("\n")).toContain("no page was judged STALE, so nothing went")
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a run naming nothing reaches no landing, though the census called a page stale", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  const said = await agentSubagentSweep([], givenIn(root), GONE, base, saying([]), held.landing)
  expect(said.report.join("\n")).toContain("wrote nothing")
  expect(said.report.join("\n")).toContain("Say `--remove`")
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a run told to remove names the stale page at the change removing a file", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  const said = await agentSubagentSweep(
    ["--remove"],
    givenIn(root),
    GONE,
    base,
    saying([]),
    held.landing
  )
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(`${at} went`)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at } }]])
  world.sweep()
})

test("the message handed to the landing says why each page went", async () => {
  const { root, base } = worldWith()
  const held = landings()
  await agentSubagentSweep(["--remove"], givenIn(root), GONE, base, saying([]), held.landing)
  const said = held.said().join("\n")
  expect(said).toContain("1 subagent page(s) go")
  expect(said).toContain("no process at all carries its seat's agent id")
  world.sweep()
})

test("a take-down the log says was refused is stale and is named to the landing", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  logPut(base, SEAT_ID, [takeLine("akasha", OWN)])
  const said = await agentSubagentSweep(
    ["--remove"],
    givenIn(root),
    ALIVE,
    base,
    saying([]),
    held.landing
  )
  expect(said.code).toBe(0)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at } }]])
  world.sweep()
})

test("only the stale are named to the landing in one run", async () => {
  const root = seated(world.rootFor("subagent-sweep-"))
  const base = world.rootFor("subagent-sweep-logs-")
  paged(root, "akasha", OWN, ACTING)
  paged(root, "akasha", AGAIN, agentIdOf(SEAT_ID, AGAIN))
  const gone = paged(root, "thea", OWN, agentIdOf(OTHER_ID, OWN))
  const held = landings()
  const said = await agentSubagentSweep(
    ["--remove"],
    givenIn(root),
    ACTS,
    base,
    saying([]),
    held.landing
  )
  expect(said.code).toBe(0)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at: gone } }]])
  world.sweep()
})

test("a landing that refused leaves the census reported and the page where it is", async () => {
  const { root, base, at } = worldWith()
  const held = landings({ refusals: ["another landing held the lock"] })
  const said = await agentSubagentSweep(
    ["--remove"],
    givenIn(root),
    GONE,
    base,
    saying([]),
    held.landing
  )
  expect(said.code).toBe(3)
  expect(said.refusals).toEqual(["another landing held the lock"])
  expect(said.report.join("\n")).toContain("STALE")
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a word this takes no flag for refuses the whole run and reaches no landing", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  for (const word of ["--all", "--force", pathOf("akasha", OWN)]) {
    const said = await agentSubagentSweep(
      [word],
      givenIn(root),
      GONE,
      base,
      saying([]),
      held.landing
    )
    expect(said.code).toBe(1)
    expect(said.refusals.join("\n")).toContain("is not a word this takes")
  }
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a transcript naming a page's own id reads that page working where no process acts", async () => {
  const { root, base } = worldWith()
  const bare = (await agentSubagentSweep([], givenIn(root), ALIVE, base, saying([]))).report.join(
    "\n"
  )
  expect(bare).toContain("0 working, 0 stale, 1 undetermined")
  const said = (
    await agentSubagentSweep([], givenIn(root), ALIVE, base, saying([OWN]))
  ).report.join("\n")
  expect(said).toContain("1 subagent page(s): 1 working, 0 stale, 0 undetermined")
  expect(said).toContain("its seat's transcript names it")
  world.sweep()
})

test("a transcript that will not open leaves the census the other evidence reached", async () => {
  const { root, base, at } = worldWith()
  for (const seen of [ACTS, ALIVE, GONE]) {
    const bare = (await agentSubagentSweep([], givenIn(root), seen, base, saying([]))).report
    const said = (await agentSubagentSweep([], givenIn(root), seen, base, THROWS)).report
    expect(said.join("\n")).toBe(bare.join("\n"))
  }
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a page working by its acting agent id is still working when no transcript opens", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  const said = await agentSubagentSweep(
    ["--remove"],
    givenIn(root),
    ACTS,
    base,
    THROWS,
    held.landing
  )
  expect(said.report.join("\n")).toContain("1 working, 0 stale, 0 undetermined")
  expect(said.report.join("\n")).toContain("no page was judged STALE, so nothing went")
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a running entry naming no agent id adds nothing to what the transcripts say", async () => {
  const { root } = worldWith()
  const pages = pagesIn(root)
  const none = await runningOwnIn(pages, reading({ [SEAT_ID]: [node(null)] }), () => NOWHERE)
  expect(none.running.size).toBe(0)
  const some = await runningOwnIn(
    pages,
    reading({ [SEAT_ID]: [node(null), node(OWN, [node(null), node(AGAIN)])] }),
    () => NOWHERE
  )
  expect([...some.running].sort()).toEqual([AGAIN, OWN].sort())
  world.sweep()
})

test("a seat whose reading throws costs that seat alone rather than the whole run", async () => {
  const { root } = worldWith()
  const said = await runningOwnIn(pagesIn(root), UNREADABLE, () => NOWHERE)
  expect(said.running.size).toBe(0)
  expect(said.ended.size).toBe(0)
  world.sweep()
})

test("a seat whose running reading throws still answers for the ids that seat saw end", async () => {
  const { root } = worldWith()
  const said = await runningOwnIn(pagesIn(root), halfReading({ [SEAT_ID]: [OWN] }), () => NOWHERE)
  expect(said.running.size).toBe(0)
  expect([...said.ended]).toEqual([OWN])
  world.sweep()
})

test("an id both readings name is answered as running and never as ended", async () => {
  const { root } = worldWith()
  const said = await runningOwnIn(
    pagesIn(root),
    reading({ [SEAT_ID]: [node(OWN)] }, { [SEAT_ID]: [OWN, AGAIN] }),
    () => NOWHERE
  )
  expect([...said.running]).toEqual([OWN])
  expect([...said.ended]).toEqual([AGAIN])
  world.sweep()
})

test("a seat naming no transcript is asked for no reading at all", async () => {
  const { root } = worldWith()
  let asked = 0
  const counted: SeatTranscripts = {
    forSeat: () => {
      asked += 1
      return Promise.resolve([])
    },
    endedForSeat: () => {
      asked += 1
      return Promise.resolve([])
    },
  }
  const said = await runningOwnIn(pagesIn(root), counted, () => null)
  expect(said.running.size).toBe(0)
  expect(said.ended.size).toBe(0)
  expect(asked).toBe(0)
  world.sweep()
})

test("a transcript naming a page's own id as ended reads that page stale", async () => {
  const { root, base } = worldWith()
  const bare = (await agentSubagentSweep([], givenIn(root), ALIVE, base, saying([]))).report.join(
    "\n"
  )
  expect(bare).toContain("0 working, 0 stale, 1 undetermined")
  const said = (
    await agentSubagentSweep([], givenIn(root), ALIVE, base, saying([], [OWN]))
  ).report.join("\n")
  expect(said).toContain("1 subagent page(s): 0 working, 1 stale, 0 undetermined")
  expect(said).toContain("started and returned")
  world.sweep()
})

test("a page the transcript says ended is named to the landing on a run told to remove", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  const said = await agentSubagentSweep(
    ["--remove"],
    givenIn(root),
    ALIVE,
    base,
    saying([], [OWN]),
    held.landing
  )
  expect(said.code).toBe(0)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at } }]])
  world.sweep()
})

test("a page a live process acts under stays though the transcript says that page ended", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  const said = await agentSubagentSweep(
    ["--remove"],
    givenIn(root),
    ACTS,
    base,
    saying([], [OWN]),
    held.landing
  )
  expect(said.report.join("\n")).toContain("1 working, 0 stale, 0 undetermined")
  expect(said.report.join("\n")).toContain("no page was judged STALE, so nothing went")
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})
