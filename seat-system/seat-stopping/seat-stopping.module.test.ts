import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { MECHANICAL } from "@akasha/command-system/asking"
import type { Given } from "@akasha/command-system/calling"
import { blobIdOf, readingIn, recordRead } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import { said as gitIn } from "@akasha/git/git-running"
import { rebuiltIn } from "@akasha/indexes/testing"
import { declaringUnder } from "@akasha/testing-system/declaring"
import {
  isAgentProcess,
  killTarget,
  subagentGuard,
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

const TREE = "akasha"

const AGENT = "01a05844-6e60-7000-b54c-4b14559df70d"

const HELD_AT = "held/what-the-seat-held.txt"

const HELD_BODY = "what the seat held\n"

function seatedRoot(root: string): string {
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(declaringUnder(TREE))) writing(root, path, body)
  writing(root, HELD_AT, HELD_BODY)
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  rebuiltIn(root, TREE)
  return root
}

function givenIn(root: string): Given {
  return {
    root,
    calledAs: "seat-stopping",
    from: root,
    writer: null,
    agentId: null,
    changeKind: MECHANICAL,
  }
}

test("a page taken away answers that it went, rather than answering the promise of it", async () => {
  const world = scratchWorld()
  try {
    const root = seatedRoot(world.rootFor("seat-stopping-"))
    const went = await took(givenIn(root), [HELD_AT], "athena was stopped, so its page goes")
    expect(went).toBe(true)
    expect(existsSync(join(root, HELD_AT))).toBe(false)
  } finally {
    world.sweep()
  }
})

test("a page taken away is forgotten by whoever read it", async () => {
  const world = scratchWorld()
  try {
    const root = seatedRoot(world.rootFor("seat-stopping-"))
    const oid = blobIdOf(new TextEncoder().encode(readFileSync(join(root, HELD_AT), "utf8")))
    recordRead(root, AGENT, { path: HELD_AT, oid, seenAt: 1, mechanicalOid: null })
    expect(readingIn(root, AGENT, HELD_AT)).not.toBe(null)
    expect(await took(givenIn(root), [HELD_AT], "athena was stopped, so its page goes")).toBe(true)
    expect(readingIn(root, AGENT, HELD_AT)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a reading is kept where the page it names did not go", async () => {
  const world = scratchWorld()
  try {
    const root = seatedRoot(world.rootFor("seat-stopping-"))
    const oid = blobIdOf(new TextEncoder().encode(readFileSync(join(root, HELD_AT), "utf8")))
    recordRead(root, AGENT, { path: HELD_AT, oid, seenAt: 1, mechanicalOid: null })
    gitIn(root, ["config", "user.email", ""])
    gitIn(root, ["config", "user.name", ""])
    let went: boolean
    try {
      went = await took(givenIn(root), [HELD_AT], "athena was stopped, so its page goes")
    } catch {
      went = false
    }
    expect(went).toBe(false)
    expect(readingIn(root, AGENT, HELD_AT)).not.toBe(null)
  } finally {
    world.sweep()
  }
})
