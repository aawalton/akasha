import { expect, test } from "bun:test"
import type { Asking } from "@akasha/changes/mechanical-change-running"
import type { Given } from "@akasha/command-system/calling"
import type { Refused } from "@akasha/command-system/landing"
import { readingIn, recordRead } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import type { Applied } from "../../commands/modules/applying/applying.module.code.ts"
import {
  isAgentProcess,
  killTarget,
  type Landing,
  subagentGuard,
  TAKE,
  took,
  type Working,
} from "./seat-stopping.module.code.ts"

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
  return (_root, changes, message) => {
    held.push({ changes, message })
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

test("a page taken away is named to the landing at the change removing a file", async () => {
  const { root } = heldIn()
  const held: Handed[] = []
  expect(await took(givenIn(root), [HELD_AT], MESSAGE, noting(held))).toBe(true)
  expect(held).toEqual([{ changes: [{ at: TAKE, given: { at: HELD_AT } }], message: MESSAGE }])
  world.sweep()
})

test("a path that is not there reaches no landing and answers that it went", async () => {
  const { root } = heldIn()
  const held: Handed[] = []
  expect(await took(givenIn(root), ["held/never-written.txt"], MESSAGE, noting(held))).toBe(true)
  expect(held).toEqual([])
  world.sweep()
})

test("a page taken away is forgotten by whoever read it", async () => {
  const { root, oid } = heldIn()
  recordRead(root, AGENT, { path: HELD_AT, oid, seenAt: 1, carriedOid: null })
  expect(readingIn(root, AGENT, HELD_AT)).not.toBe(null)
  expect(await took(givenIn(root), [HELD_AT], MESSAGE, noting([]))).toBe(true)
  expect(readingIn(root, AGENT, HELD_AT)).toBe(null)
  world.sweep()
})

test("a reading is kept where the landing refused the page it names", async () => {
  const { root, oid } = heldIn()
  recordRead(root, AGENT, { path: HELD_AT, oid, seenAt: 1, carriedOid: null })
  const held = noting([], { refusals: ["another landing held the lock"] })
  expect(await took(givenIn(root), [HELD_AT], MESSAGE, held)).toBe(false)
  expect(readingIn(root, AGENT, HELD_AT)).not.toBe(null)
  world.sweep()
})

test("a landing answering something wrong leaves the reading where it is", async () => {
  const { root, oid } = heldIn()
  recordRead(root, AGENT, { path: HELD_AT, oid, seenAt: 1, carriedOid: null })
  const held = noting([], { ...LANDED, wrong: ["the check refused"] })
  expect(await took(givenIn(root), [HELD_AT], MESSAGE, held)).toBe(false)
  expect(readingIn(root, AGENT, HELD_AT)).not.toBe(null)
  world.sweep()
})
