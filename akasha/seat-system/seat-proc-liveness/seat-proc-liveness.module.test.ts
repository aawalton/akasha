import { expect, test } from "bun:test"
import {
  agentsWithInFlightBackgroundTask,
  backgroundTaskCmdlinesByAgent,
  isAgentProcessCmdline,
  isClaudeChildCmdline,
  isSupervisorCmdline,
  liveAgentIdsFromProc,
  liveAgentPidsFromProc,
  liveClaudeChildIdsFromProc,
  liveSupervisorIdsFromProc,
  type ProcLivenessEntry,
} from "./seat-proc-liveness.module.code.ts"

const ONE = "0199a1b2-c3d4-7e5f-8091-a2b3c4d5e6f7"
const TWO = "0199a1b2-c3d4-7e5f-8091-a2b3c4d5e6f8"

const CHILD = "claude --dangerously-skip-permissions --model opus"
const SUPERVISOR = "/usr/bin/bun tools/lib/supervisor.ts --seat one"
const TASK = "rg --json needle ."

function entry(over: Partial<ProcLivenessEntry> & { agentId: string }): ProcLivenessEntry {
  return { cmdline: CHILD, pid: 1, ...over }
}

test("a Claude child is read off its skip-permissions flag", () => {
  expect(isClaudeChildCmdline(CHILD)).toBe(true)
  expect(isClaudeChildCmdline("claude --help")).toBe(false)
})

test("a supervisor is read off bun running supervisor.ts", () => {
  expect(isSupervisorCmdline(SUPERVISOR)).toBe(true)
  expect(isSupervisorCmdline("bun tools/lib/other.ts")).toBe(false)
})

test("a supervisor named by a bare bun is a supervisor too", () => {
  expect(isSupervisorCmdline("bun supervisor.ts")).toBe(true)
})

test("an agent's own process is its child or its supervisor and nothing else", () => {
  expect(isAgentProcessCmdline(CHILD)).toBe(true)
  expect(isAgentProcessCmdline(SUPERVISOR)).toBe(true)
  expect(isAgentProcessCmdline(TASK)).toBe(false)
})

test("a process whose agent is named as no uuid stands for no agent", () => {
  expect(liveAgentIdsFromProc([entry({ agentId: "not-a-uuid" })]).size).toBe(0)
})

test("the live agents are those with a child or a supervisor standing", () => {
  const live = liveAgentIdsFromProc([
    entry({ agentId: ONE, cmdline: CHILD }),
    entry({ agentId: TWO, cmdline: SUPERVISOR }),
    entry({ agentId: "0199a1b2-c3d4-7e5f-8091-a2b3c4d5e6f9", cmdline: TASK }),
  ])
  expect([...live].sort()).toEqual([ONE, TWO])
})

test("children and supervisors are counted apart from one another", () => {
  const entries = [
    entry({ agentId: ONE, cmdline: CHILD }),
    entry({ agentId: TWO, cmdline: SUPERVISOR }),
  ]
  expect([...liveClaudeChildIdsFromProc(entries)]).toEqual([ONE])
  expect([...liveSupervisorIdsFromProc(entries)]).toEqual([TWO])
})

test("a background task is a live agent's process that is not the agent itself", () => {
  const said = backgroundTaskCmdlinesByAgent([
    entry({ agentId: ONE, cmdline: CHILD, pid: 1 }),
    entry({ agentId: ONE, cmdline: TASK, pid: 2 }),
  ])
  expect(said.get(ONE)).toEqual([TASK])
})

test("an agent with no live child has no background tasks counted", () => {
  const said = backgroundTaskCmdlinesByAgent([entry({ agentId: ONE, cmdline: TASK, pid: 2 })])
  expect(said.size).toBe(0)
})

test("the infrastructure a seat leans on is not a background task", () => {
  const said = backgroundTaskCmdlinesByAgent([
    entry({ agentId: ONE, cmdline: CHILD, pid: 1 }),
    entry({ agentId: ONE, cmdline: "bun tools/lib/model-gateway/main.ts", pid: 2 }),
  ])
  expect(said.size).toBe(0)
})

test("a process in uninterruptible sleep is not counted as a background task", () => {
  const said = backgroundTaskCmdlinesByAgent([
    entry({ agentId: ONE, cmdline: CHILD, pid: 1 }),
    entry({ agentId: ONE, cmdline: TASK, pid: 2, state: "D" }),
  ])
  expect(said.size).toBe(0)
})

test("the agents with work in flight are those with a background task", () => {
  const said = agentsWithInFlightBackgroundTask([
    entry({ agentId: ONE, cmdline: CHILD, pid: 1 }),
    entry({ agentId: ONE, cmdline: TASK, pid: 2 }),
    entry({ agentId: TWO, cmdline: CHILD, pid: 3 }),
  ])
  expect([...said]).toEqual([ONE])
})

test("every pid an agent's own processes stand on is gathered under its id", () => {
  const said = liveAgentPidsFromProc([
    entry({ agentId: ONE, cmdline: CHILD, pid: 1 }),
    entry({ agentId: ONE, cmdline: SUPERVISOR, pid: 2 }),
    entry({ agentId: ONE, cmdline: TASK, pid: 3 }),
  ])
  expect(said.get(ONE)).toEqual([1, 2])
})
