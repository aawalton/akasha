import { expect, test } from "bun:test"
import type { ProcLivenessEntry } from "akasha/seat-system/seat-proc-liveness/seat-proc-liveness.module.code.ts"
import type { spawnClaudeChild } from "akasha/seat-system/supervising/supervisor-adopt/supervisor-adopt.module.code.ts"
import type { ChildExitRuleSource } from "akasha/seat-system/supervising/supervisor-child-exit-rule/supervisor-child-exit-rule.module.code.ts"
import {
  type ChildSpawnSeams,
  findLiveClaudeChild,
  SPAWNED_FRESH,
  spawnOrAdoptChild,
} from "akasha/seat-system/supervising/supervisor-child-spawn/supervisor-child-spawn.module.code.ts"
import type { InheritedProc } from "akasha/seat-system/supervising/supervisor-types/supervisor-types.module.code.ts"

const AGENT = "01a0683e-3dbe-7010-8b9f-e1ca56441ef8"

const CLAUDE = "/usr/bin/claude --dangerously-skip-permissions"

const LIVE = 4242

const UNASKED = "the child exit rule was asked something this run does not reach"

const NEVER_ASKED: ChildExitRuleSource = {
  decodeWaitStatus: () => {
    throw new Error(UNASKED)
  },
  collapse: () => {
    throw new Error(UNASKED)
  },
  classify: () => {
    throw new Error(UNASKED)
  },
  shutdownWrite: () => {
    throw new Error(UNASKED)
  },
}

const SPAWN_OPTS: Parameters<typeof spawnClaudeChild>[0] = {
  cliArgs: [],
  currentPrompt: "",
  cwd: "/var/home/nobody/repos/akasha",
  agentId: AGENT,
  sessionId: "01a0683e-3dbe-7010-8b9f-e1ca56441eff",
  configDir: "/var/home/nobody/.claude",
  anthropicBaseUrl: "http://127.0.0.1:1",
  headless: true,
  remoteControlOn: false,
  proxySocketPath: "/var/home/nobody/.claude/proxy.sock",
  subagentSpawnDepth: "1",
  toolTimeout: "1",
  resumeThresholdMinutes: "1",
  resumeTokenThreshold: "1",
}

function childAt(pid: number): InheritedProc {
  return {
    pid,
    exited: Promise.resolve(0),
    exitStatus: () => ({ exitCode: null, signal: null }),
    kill: () => undefined,
  }
}

function scanning(entries: readonly ProcLivenessEntry[]): ChildSpawnSeams["scanProcs"] {
  return () => ({ ok: true, entries })
}

const NO_CHILD = scanning([])

const ONE_CHILD = scanning([{ agentId: AGENT, pid: LIVE, ppid: process.pid, cmdline: CLAUDE }])

function sweepingInto(said: string[]): ChildSpawnSeams["sweepSubagents"] {
  return (seat, why) => {
    said.push(`${seat} ${why}`)
    return undefined
  }
}

function spawningNothing(): InheritedProc {
  throw new Error("the adopt branch spawned a client of its own")
}

function ranWith(seams: Partial<ChildSpawnSeams>): {
  proc: InheritedProc | null
  adoptedThisIter: boolean
} {
  return spawnOrAdoptChild({
    adoptOnce: null,
    spawnOpts: SPAWN_OPTS,
    childExitRule: NEVER_ASKED,
    seams,
  })
}

test("a live claude child of this supervisor is found by its agent and its parent", () => {
  const entries: readonly ProcLivenessEntry[] = [
    { agentId: AGENT, pid: LIVE, ppid: process.pid, cmdline: CLAUDE },
  ]

  expect(findLiveClaudeChild(AGENT, entries, process.pid)).toBe(LIVE)
  expect(findLiveClaudeChild(AGENT, entries, process.pid + 1)).toBeNull()
  expect(findLiveClaudeChild("someone else", entries, process.pid)).toBeNull()
})

test("a child spawned afresh has the subagent pages under its seat taken away", () => {
  const swept: string[] = []

  const { adoptedThisIter } = ranWith({
    scanProcs: NO_CHILD,
    spawnChild: () => childAt(LIVE),
    admitSpawn: () => undefined,
    takeShells: () => false,
    sweepSubagents: sweepingInto(swept),
  })

  expect(adoptedThisIter).toBe(false)
  expect(swept).toEqual([`${AGENT} ${SPAWNED_FRESH}`])
})

test("an adopted child is the same client, so the subagent pages under it stay", () => {
  const swept: string[] = []

  const { adoptedThisIter } = ranWith({
    scanProcs: ONE_CHILD,
    adoptProc: (pid) => childAt(pid),
    spawnChild: spawningNothing,
    admitSpawn: () => undefined,
    takeShells: () => false,
    sweepSubagents: sweepingInto(swept),
  })

  expect(adoptedThisIter).toBe(true)
  expect(swept).toEqual([])
})

test("a live child that could not be adopted is spawned over, and its pages go", () => {
  const swept: string[] = []

  const { adoptedThisIter } = ranWith({
    scanProcs: ONE_CHILD,
    adoptProc: () => {
      throw new Error("this pid is gone")
    },
    spawnChild: () => childAt(LIVE),
    admitSpawn: () => undefined,
    takeShells: () => false,
    sweepSubagents: sweepingInto(swept),
  })

  expect(adoptedThisIter).toBe(false)
  expect(swept).toEqual([`${AGENT} ${SPAWNED_FRESH}`])
})
