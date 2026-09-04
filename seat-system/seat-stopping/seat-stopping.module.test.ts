import { expect, test } from "bun:test"
import {
  isAgentProcess,
  killTarget,
  subagentGuard,
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
