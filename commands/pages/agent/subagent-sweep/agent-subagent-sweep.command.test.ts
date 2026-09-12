import { expect, test } from "bun:test"
import { pagesIn } from "akasha/agents/subagents/modules/census/subagent-census.module.code.ts"
import { refusalsSaid } from "akasha/agents/subagents/modules/recovering/subagent-recovering.module.code.ts"
import {
  agentSubagentSweep,
  runningOwnIn,
  TAKE,
} from "akasha/commands/pages/agent/subagent-sweep/agent-subagent-sweep.command.code.ts"
import {
  ACTING,
  ACTS,
  AGAIN,
  ALIVE,
  COMMIT,
  countingReads,
  editsBeside,
  GONE,
  givenIn,
  halfReading,
  keptBySeat,
  LOCK_HELD,
  landings,
  logPut,
  NOTHING_KEPT,
  NOWHERE,
  node,
  OWN,
  oneWaiting,
  pathOf,
  REFUSAL,
  ROW,
  reading,
  refusalBeside,
  refusedRemoving,
  removing,
  reported,
  reportSays,
  SEAT_ID,
  saying,
  seatFiled,
  THREW_AFTER,
  THROWN,
  THROWS,
  takeLine,
  there,
  threePaged,
  twoThea,
  twoWaiting,
  UNREADABLE,
  unlandedBy,
  world,
  worldWith,
} from "akasha/commands/pages/agent/subagent-sweep/agent-subagent-sweep.command.test-fixtures.ts"

test("a page whose agent no live process answers for is named stale", async () => {
  const { root, base } = worldWith()
  const said = await agentSubagentSweep([], givenIn(root), GONE, base, saying([]))
  expect(said.code).toBe(0)
  reportSays(said, "STALE", `agent ${ACTING}`)
  world.sweep()
})

test("a page a live process acts under is named working rather than stale", async () => {
  const { root, base } = worldWith()
  const said = await reported(root, base, ACTS, saying([]))
  expect(said).toContain("1 subagent page(s): 1 working, 0 stale, 0 undetermined")
  expect(said).toContain("pid 9 answers")
  expect(said).not.toMatch(/^STALE/m)
  world.sweep()
})

test("a page a live process acts under is named to no landing by a run told to remove", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  const said = await removing(root, base, ACTS, saying([]), held.landing)
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("no page was judged STALE, so nothing went")
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a page nothing settles is undetermined and is named to no landing", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  const said = await removing(root, base, ALIVE, saying([]), held.landing)
  reportSays(said, "UNDETERMINED", "no page was judged STALE, so nothing went")
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a run naming nothing reaches no landing, though the census called a page stale", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  const said = await agentSubagentSweep([], givenIn(root), GONE, base, saying([]), held.landing)
  reportSays(said, "wrote nothing", "Say `--remove`")
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a run told to remove names the stale page at the change removing a file", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  const said = await removing(root, base, GONE, saying([]), held.landing)
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(`${at} went`)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at } }]])
  world.sweep()
})

test("the message handed to the landing says why each page went", async () => {
  const { root, base } = worldWith()
  const held = landings()
  await removing(root, base, GONE, saying([]), held.landing)
  const said = held.said().join("\n")
  expect(said).toContain("1 subagent page(s) go")
  expect(said).toContain("no process at all carries its seat's agent id")
  world.sweep()
})

test("a take-down the log says was refused is stale and is named to the landing", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  logPut(base, SEAT_ID, [takeLine("akasha", OWN)])
  const said = await removing(root, base, ALIVE, saying([]), held.landing)
  expect(said.code).toBe(0)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at } }]])
  world.sweep()
})

test("only the stale are named to the landing in one run", async () => {
  const { root, base, gone } = threePaged()
  const held = landings()
  const said = await removing(root, base, ACTS, saying([]), held.landing)
  expect(said.code).toBe(0)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at: gone } }]])
  world.sweep()
})

test("a landing that refused leaves the census reported and the page where it is", async () => {
  const { root, base, at } = worldWith()
  const said = await refusedRemoving(root, base, GONE, saying([]))
  expect(said.code).toBe(3)
  expect(said.refusals).toEqual([LOCK_HELD])
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
    expect(said.refusals.join("\n")).toContain(`\`${word}\` is no argument`)
  }
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a transcript naming a page's own id reads that page working where no process acts", async () => {
  const { root, base } = worldWith()
  const bare = await reported(root, base, ALIVE, saying([]))
  expect(bare).toContain("0 working, 0 stale, 1 undetermined")
  const said = await reported(root, base, ALIVE, saying([OWN]))
  expect(said).toContain("1 subagent page(s): 1 working, 0 stale, 0 undetermined")
  expect(said).toContain("its seat's transcript names it")
  world.sweep()
})

test("a transcript that will not open leaves the census the other evidence reached", async () => {
  const { root, base, at } = worldWith()
  for (const seen of [ACTS, ALIVE, GONE]) {
    const bare = await reported(root, base, seen, saying([]))
    expect(await reported(root, base, seen, THROWS)).toBe(bare)
  }
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a page working by its acting agent id is still working when no transcript opens", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  const said = await removing(root, base, ACTS, THROWS, held.landing)
  reportSays(
    said,
    "1 working, 0 stale, 0 undetermined",
    "no page was judged STALE, so nothing went"
  )
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
  const held = countingReads()
  const said = await runningOwnIn(pagesIn(root), held.reads, () => null)
  expect(said.running.size).toBe(0)
  expect(said.ended.size).toBe(0)
  expect(held.asked()).toBe(0)
  world.sweep()
})

test("a transcript naming a page's own id as ended reads that page stale", async () => {
  const { root, base } = worldWith()
  const bare = await reported(root, base, ALIVE, saying([]))
  expect(bare).toContain("0 working, 0 stale, 1 undetermined")
  const said = await reported(root, base, ALIVE, saying([], [OWN]))
  expect(said).toContain("1 subagent page(s): 0 working, 1 stale, 0 undetermined")
  expect(said).toContain("started and returned")
  world.sweep()
})

test("a page the transcript says ended is named to the landing on a run told to remove", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  const said = await removing(root, base, ALIVE, saying([], [OWN]), held.landing)
  expect(said.code).toBe(0)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at } }]])
  world.sweep()
})

test("a stale page whose seat the index files no page for is left where it is", async () => {
  const { root, base, at } = worldWith()
  editsBeside(root, at)
  const held = landings()
  const said = await removing(root, base, ALIVE, saying([], [OWN]), held.landing)
  expect(said.code).toBe(0)
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  reportSays(
    said,
    "the index files no page for the akasha seat",
    `akasha-${OWN}`,
    "every page judged STALE was left where it is"
  )
  world.sweep()
})

test("only the stale pages nothing left edits beside are named to the landing", async () => {
  const { root, base, kept, gone } = twoThea()
  const held = landings()
  const said = await removing(root, base, ALIVE, saying([]), held.landing)
  expect(said.code).toBe(0)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at: gone } }]])
  expect(there(root, kept)).toBe(true)
  expect(said.report.join("\n")).toContain(
    "1 page(s) the census judged STALE are left where they are"
  )
  world.sweep()
})

test("a stale page whose subagent left edits waiting moves them onto its seat and goes", async () => {
  const { root, base, at } = worldWith()
  const seat = seatFiled(root, "akasha", SEAT_ID)
  editsBeside(root, at)
  refusalBeside(root, at)
  const held = landings()
  const said = await removing(root, base, ALIVE, saying([], [OWN]), held.landing)
  expect(said.code).toBe(0)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at } }]])
  expect(keptBySeat(root, seat)).toEqual({
    edits: ROW,
    refusals: refusalsSaid(`akasha-${OWN}`, REFUSAL),
  })
  expect(said.report.join("\n")).toContain("left 1 edit(s) unlanded")
  world.sweep()
})

test("a run the landing refused names what it had already moved onto a seat", async () => {
  const { root, base, seat } = oneWaiting()
  const said = await refusedRemoving(root, base, ALIVE, saying([], [OWN]))
  expect(said.code).toBe(3)
  expect(said.refusals.at(-1)).toContain("left 1 edit(s) unlanded")
  expect(keptBySeat(root, seat).edits).toBe(ROW)
  world.sweep()
})

test("a stale page with nothing waiting beside it goes and moves nothing onto its seat", async () => {
  const { root, base, at } = worldWith()
  const seat = seatFiled(root, "akasha", SEAT_ID)
  const held = landings()
  const said = await removing(root, base, ALIVE, saying([], [OWN]), held.landing)
  expect(said.code).toBe(0)
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at } }]])
  expect(keptBySeat(root, seat)).toEqual(NOTHING_KEPT)
  expect(said.report.join("\n")).not.toContain("unlanded")
  world.sweep()
})

test("a working page whose subagent left edits waiting keeps them and is named to no landing", async () => {
  const { root, base, at } = worldWith()
  const seat = seatFiled(root, "akasha", SEAT_ID)
  const edits = editsBeside(root, at)
  const held = landings()
  const said = await removing(root, base, ACTS, saying([OWN]), held.landing)
  expect(said.report.join("\n")).toContain("1 working, 0 stale, 0 undetermined")
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  expect(there(root, edits)).toBe(true)
  expect(keptBySeat(root, seat)).toEqual(NOTHING_KEPT)
  world.sweep()
})

test("a page a live process acts under stays though the transcript says that page ended", async () => {
  const { root, base, at } = worldWith()
  const held = landings()
  const said = await removing(root, base, ACTS, saying([], [OWN]), held.landing)
  reportSays(
    said,
    "1 working, 0 stale, 0 undetermined",
    "no page was judged STALE, so nothing went"
  )
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  world.sweep()
})

test("a run whose landing committed before it threw names that commit", async () => {
  const { root, base } = worldWith()
  const said = await removing(root, base, GONE, saying([]), THREW_AFTER)
  expect(said.refusals.join("\n")).toContain(COMMIT)
  world.sweep()
})

test("each page is named onto its seat as soon as that page's move lands", async () => {
  const { root, base } = worldWith()
  twoWaiting(root)

  const said = await removing(root, base, ALIVE, saying([]), landings().landing)
  const report = said.report.join("\n")
  expect(report).toContain(unlandedBy("thea", OWN))
  expect(report).toContain(unlandedBy("thea", AGAIN))
  world.sweep()
})

test("a run whose landing threw part way names in its refusal what it had moved", async () => {
  const { root, base } = worldWith()
  twoWaiting(root)

  const said = await removing(root, base, ALIVE, saying([]), THROWN)
  expect(said.code).toBe(3)
  const last = said.refusals[said.refusals.length - 1] as string
  expect(last).toContain(unlandedBy("thea", OWN))
  expect(last).toContain(unlandedBy("thea", AGAIN))
  world.sweep()
})

test("a run whose landing threw before anything moved names nothing moved", async () => {
  const { root, base } = worldWith()

  const said = await removing(root, base, GONE, saying([]), THROWN)
  expect(said.code).toBe(3)
  expect(said.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
  world.sweep()
})
