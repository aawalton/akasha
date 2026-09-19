import { expect, test } from "bun:test"
import {
  actingAgentPidsFromProc,
  isAgentProcessCmdline,
  isClaudeChildCmdline,
  isSupervisorCmdline,
  liveAgentPidsFromProc,
} from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { entry } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.test-fixtures.ts"

const ONE = "0199a1b2-c3d4-7e5f-8091-a2b3c4d5e6f7"

const ACTING = `${ONE}--a38f63805f9b94edf`

const CHILD = "claude --dangerously-skip-permissions --model opus"
const SUPERVISOR =
  "bun run /repo/agent/seat/supervisor/supervisor-process/modules/run-supervisor/run-supervisor.module.code.ts -a aawalton"
const TASK = "rg --json needle ."

test("a Claude child is read off its skip-permissions flag", () => {
  expect(isClaudeChildCmdline(CHILD)).toBe(true)
  expect(isClaudeChildCmdline("claude --help")).toBe(false)
})

test("a supervisor is read off bun running run-supervisor", () => {
  expect(isSupervisorCmdline(SUPERVISOR)).toBe(true)
  expect(isSupervisorCmdline("bun tools/lib/other.ts")).toBe(false)
})

test("a supervisor the bun on the path runs is a supervisor too", () => {
  expect(
    isSupervisorCmdline("/var/home/walton/.bun/bin/bun /repo/run-supervisor.module.code.ts")
  ).toBe(true)
})

test("the supervisor spelling this predicate was written for is gone", () => {
  expect(isSupervisorCmdline("/usr/bin/bun tools/lib/supervisor.ts --seat one")).toBe(false)
})

test("an agent's own process is its child or its supervisor and nothing else", () => {
  expect(isAgentProcessCmdline(CHILD)).toBe(true)
  expect(isAgentProcessCmdline(SUPERVISOR)).toBe(true)
  expect(isAgentProcessCmdline(TASK)).toBe(false)
})

test("a process whose agent is named as no uuid stands for no agent", () => {
  expect(liveAgentPidsFromProc([entry({ agentId: "not-a-uuid" })]).size).toBe(0)
})

test("every pid an agent's own processes stand on is gathered under its id", () => {
  const said = liveAgentPidsFromProc([
    entry({ agentId: ONE, cmdline: CHILD, pid: 1 }),
    entry({ agentId: ONE, cmdline: SUPERVISOR, pid: 2 }),
    entry({ agentId: ONE, cmdline: TASK, pid: 3 }),
  ])
  expect(said.get(ONE)).toEqual([1, 2])
})

test("a subagent is named by the agent a process acts under rather than by AGENT_ID", () => {
  const entries = [entry({ agentId: ONE, actingAgentId: ACTING, cmdline: TASK, pid: 7 })]
  expect(liveAgentPidsFromProc(entries).has(ACTING)).toBe(false)
  expect(actingAgentPidsFromProc(entries).get(ACTING)).toEqual([7])
})

test("a process naming no acting agent is gathered under nobody", () => {
  const said = actingAgentPidsFromProc([entry({ agentId: ONE, cmdline: CHILD, pid: 1 })])
  expect(said.size).toBe(0)
})

test("every pid a subagent's processes run on is gathered under its acting id", () => {
  const said = actingAgentPidsFromProc([
    entry({ agentId: ONE, actingAgentId: ACTING, cmdline: TASK, pid: 4 }),
    entry({ agentId: ONE, actingAgentId: ACTING, cmdline: "sleep 5", pid: 5 }),
    entry({ agentId: ONE, cmdline: CHILD, pid: 6 }),
  ])
  expect(said.get(ACTING)).toEqual([4, 5])
  expect(said.size).toBe(1)
})

test("a process whose cmdline no test here holds of is gathered all the same", () => {
  const said = actingAgentPidsFromProc([
    entry({ agentId: ONE, actingAgentId: ACTING, cmdline: "cat /etc/hosts", pid: 9 }),
  ])
  expect(said.get(ACTING)).toEqual([9])
})
