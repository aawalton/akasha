import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { readingIn, recordRead } from "akasha/agents/read-record/read-record.module.code.ts"
import {
  isAgentProcess,
  killTarget,
  type Landing,
  moving,
  stillUp,
  subagentGuard,
  TAKE,
  took,
  type Working,
} from "akasha/agents/seats/modules/stopping/seat-stopping.module.code.ts"
import { seatEditsAt } from "akasha/agents/subagents/modules/recovering/subagent-recovering.module.code.ts"
import { EXIT } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  appendEdits,
  linesIn,
} from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Applied } from "akasha/commands/modules/applying/applying.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Refused } from "akasha/commands/modules/landing/landing.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"

const SELF = 4242

function working(...kinds: readonly string[]): readonly Working[] {
  return kinds.map((dispatchedAs, at) => ({ path: `p${String(at)}`, dispatchedAs }))
}

test("every process carrying the id is signalled", () => {
  expect(killTarget({ procPids: [11, 12], seatName: "athena", selfPid: SELF })).toEqual({
    kind: "signal",
    pids: [11, 12],
  })
})

test("the caller's own process is never signalled", () => {
  expect(killTarget({ procPids: [11, SELF], seatName: "athena", selfPid: SELF })).toEqual({
    kind: "signal",
    pids: [11],
  })
})

test("a seat whose only process is the caller falls to its session", () => {
  expect(killTarget({ procPids: [SELF], seatName: "athena", selfPid: SELF })).toEqual({
    kind: "session",
    name: "athena",
  })
})

test("a seat with no process is ended by ending its session", () => {
  expect(killTarget({ procPids: [], seatName: "athena", selfPid: SELF })).toEqual({
    kind: "session",
    name: "athena",
  })
})

test("a seat with neither process nor name leaves only its page to take", () => {
  expect(killTarget({ procPids: [], seatName: null, selfPid: SELF })).toEqual({ kind: "reconcile" })
})

test("a seat nothing is running in is stopped though subagents are recorded", () => {
  const said = subagentGuard({
    working: working("Explore"),
    seatAlive: false,
    force: false,
    seatName: "athena",
  })
  expect(said).toEqual({ kind: "allow" })
})

test("a live seat with no subagent working is stopped", () => {
  expect(subagentGuard({ working: [], seatAlive: true, force: false, seatName: "athena" })).toEqual(
    { kind: "allow" }
  )
})

test("a live seat with subagents working is refused, and the refusal names their kinds", () => {
  const said = subagentGuard({
    working: working("Explore", "general-purpose", "Explore"),
    seatAlive: true,
    force: false,
    seatName: "athena",
  })
  expect(said.kind).toBe("refuse")
  if (said.kind !== "refuse") throw new Error("refused")
  expect(said.said).toContain("3 subagents working")
  expect(said.said).toContain("Explore, general-purpose")
  expect(said.said).toContain("--force")
})

test("one subagent working is refused in the singular", () => {
  const said = subagentGuard({
    working: working("Explore"),
    seatAlive: true,
    force: false,
    seatName: "athena",
  })
  if (said.kind !== "refuse") throw new Error("refused")
  expect(said.said).toContain("1 subagent working")
  expect(said.said).not.toContain("subagents")
})

test("force stops a live seat with subagents working", () => {
  expect(
    subagentGuard({ working: working("Explore"), seatAlive: true, force: true, seatName: "athena" })
  ).toEqual({ kind: "allow" })
})

test("a supervisor and a client are the agent's own processes", () => {
  expect(isAgentProcess("/usr/bin/bun /repo/tools/supervisor.ts --name athena")).toBe(true)
  expect(isAgentProcess("claude --dangerously-skip-permissions --model opus")).toBe(true)
})

test("a process that is neither is not signalled for the seat", () => {
  expect(isAgentProcess("bun /repo/tools/seat-call.ts")).toBe(false)
  expect(isAgentProcess("tmux new-session -d -s athena")).toBe(false)
})

test("a seat whose processes all ended is not said to be up", () => {
  expect(stillUp("athena", [11, 12], true)).toBe(null)
})

test("a seat whose processes did not all end is refused naming the pids signalled", () => {
  const said = stillUp("athena", [11, 12], false)
  expect(said).not.toBe(null)
  expect(said as string).toContain("athena")
  expect(said as string).toContain("11, 12")
  expect(said as string).toContain("did not all end")
  expect(said as string).toContain("kept rather than taken")
})

const AGENT = "01a05844-6e60-7000-b54c-4b14559df70d"

const HELD_AT = "held/what-the-seat-held.txt"

const HELD_BODY = "what the seat held\n"

const MESSAGE = "athena was stopped, so its page goes"

const LANDED: Applied = {
  base: "0000000000000000000000000000000000000000",
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: "1111111111111111111111111111111111111111",
}

type Handed = { readonly changes: readonly Asking[]; readonly message: string }

function noting(held: Handed[], answer: Applied | Refused = LANDED): Landing {
  return (done, _root, changes, message) => {
    held.push({ changes, message })
    if ("commit" in answer && answer.commit !== null) done.push(answer.commit)
    return Promise.resolve(answer)
  }
}

function givenIn(root: string): Given {
  return { root, calledAs: "seat-stopping", from: root, writer: null, agentId: null }
}

const world = scratchWorld()

function heldIn(): { root: string; oid: string } {
  const root = world.rootFor("seat-stopping-")
  return { root, oid: writing(root, HELD_AT, HELD_BODY) }
}

test("a page taken away goes through the change that dispatches by what the file is", () => {
  expect(TAKE).toBe("change-mechanical/remove-file-of-any-kind")
})

test("a page taken away is named to the landing at the change removing a file", async () => {
  const { root } = heldIn()
  const held: Handed[] = []
  expect(await took(givenIn(root), [HELD_AT], MESSAGE, [], noting(held))).toBe(true)
  expect(held).toEqual([{ changes: [{ at: TAKE, given: { at: HELD_AT } }], message: MESSAGE }])
  world.sweep()
})

test("the commit the landing made is named to the list the caller handed in", async () => {
  const { root } = heldIn()
  const done: string[] = []
  expect(await took(givenIn(root), [HELD_AT], MESSAGE, done, noting([]))).toBe(true)
  expect(done).toEqual([LANDED.commit as string])
  world.sweep()
})

test("a path that is not there reaches no landing and answers that it went", async () => {
  const { root } = heldIn()
  const held: Handed[] = []
  expect(await took(givenIn(root), ["held/never-written.txt"], MESSAGE, [], noting(held))).toBe(
    true
  )
  expect(held).toEqual([])
  world.sweep()
})

test("a page taken away is forgotten by whoever read it", async () => {
  const { root, oid } = heldIn()
  recordRead(root, AGENT, { path: HELD_AT, oid, seenAt: 1, carriedOid: null })
  expect(readingIn(root, AGENT, HELD_AT)).not.toBe(null)
  expect(await took(givenIn(root), [HELD_AT], MESSAGE, [], noting([]))).toBe(true)
  expect(readingIn(root, AGENT, HELD_AT)).toBe(null)
  world.sweep()
})

test("a reading is kept where the landing refused the page it names", async () => {
  const { root, oid } = heldIn()
  recordRead(root, AGENT, { path: HELD_AT, oid, seenAt: 1, carriedOid: null })
  const held = noting([], { refusals: ["another landing held the lock"], code: EXIT.OPERATIONAL })
  expect(await took(givenIn(root), [HELD_AT], MESSAGE, [], held)).toBe(false)
  expect(readingIn(root, AGENT, HELD_AT)).not.toBe(null)
  world.sweep()
})

test("a landing answering something wrong leaves the reading where it is", async () => {
  const { root, oid } = heldIn()
  recordRead(root, AGENT, { path: HELD_AT, oid, seenAt: 1, carriedOid: null })
  const held = noting([], { ...LANDED, wrong: ["the check refused"] })
  expect(await took(givenIn(root), [HELD_AT], MESSAGE, [], held)).toBe(false)
  expect(readingIn(root, AGENT, HELD_AT)).not.toBe(null)
  world.sweep()
})

const SEAT_AT = "agents/seats/pages/tester/tester.seat.ts"

const UNDER_AT = "seat-system/subagents/pages/tester-abc/tester-abc.subagent.ts"

const SEAT_BODY = "export const tester = {} as const\n"

const ROW: FileChange = { kind: "remove", path: "one.md" }

const UNDER: readonly Working[] = [{ path: UNDER_AT, dispatchedAs: "Explore" }]

test("what a subagent left unlanded is moved onto its seat and said back", () => {
  const root = world.rootFor("seat-stopping-")
  writing(root, SEAT_AT, SEAT_BODY)
  appendEdits(root, UNDER_AT, [ROW])
  expect(moving(givenIn(root), SEAT_AT, UNDER)).toEqual([
    "tester-abc left 1 edit(s) unlanded, and the seat keeps them",
  ])
  expect(linesIn(root, UNDER_AT)).toEqual([])
  world.sweep()
})

test("the seat keeps what moved beside its own page", () => {
  const root = world.rootFor("seat-stopping-")
  writing(root, SEAT_AT, SEAT_BODY)
  appendEdits(root, UNDER_AT, [ROW])
  moving(givenIn(root), SEAT_AT, UNDER)
  const at = seatEditsAt(SEAT_AT)
  expect(at).toBe("agents/seats/pages/tester/tester.seat.subagent-edits.uncommitted.jsonl")
  expect(readFileSync(join(root, at ?? ""), "utf8")).toBe(`${JSON.stringify(ROW)}\n`)
  world.sweep()
})

test("nothing is moved onto a seat whose page is not there to hold it", () => {
  const root = world.rootFor("seat-stopping-")
  appendEdits(root, UNDER_AT, [ROW])
  expect(moving(givenIn(root), SEAT_AT, UNDER)).toEqual([])
  expect(linesIn(root, UNDER_AT)).toEqual([JSON.stringify(ROW)])
  expect(existsSync(join(root, seatEditsAt(SEAT_AT) ?? ""))).toBe(false)
  world.sweep()
})

test("a seat with nothing dispatched under it moves nothing and says nothing", () => {
  const root = world.rootFor("seat-stopping-")
  writing(root, SEAT_AT, SEAT_BODY)
  expect(moving(givenIn(root), SEAT_AT, [])).toEqual([])
  world.sweep()
})
