import { expect, test } from "bun:test"
import type { ProcLivenessEntry } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import {
  rejectSelfProc,
  selectSupersededTreePids,
} from "akasha/agent/modules/proc-tree/agent-proc-tree.module.code.ts"

const ONE = "0199a1b2-c3d4-7e5f-8091-a2b3c4d5e6f7"

const CHILD = "claude --dangerously-skip-permissions"
const SUPERVISOR =
  "bun run agent/seat/supervisor/supervisor-process/modules/run-supervisor/run-supervisor.module.code.ts"
const TASK = "bun tools/some-task.ts"

function proc(over: Partial<ProcLivenessEntry> & { pid: number }): ProcLivenessEntry {
  return { agentId: ONE, cmdline: CHILD, ...over }
}

test("an agent whose processes form one tree has outlived none of them", () => {
  const said = selectSupersededTreePids(
    [proc({ pid: 10, cmdline: SUPERVISOR }), proc({ pid: 11, ppid: 10, cmdline: CHILD })],
    ONE,
    999
  )
  expect(said).toEqual([])
})

test("a second tree is superseded, the newest tree being kept", () => {
  const said = selectSupersededTreePids(
    [
      proc({ pid: 10, cmdline: SUPERVISOR, startMs: 100 }),
      proc({ pid: 11, ppid: 10, cmdline: CHILD, startMs: 100 }),
      proc({ pid: 20, cmdline: SUPERVISOR, startMs: 900 }),
    ],
    ONE,
    999
  )
  expect(said).toEqual([10, 11])
})

test("a stated keeper decides which tree is kept over the newest", () => {
  const said = selectSupersededTreePids(
    [
      proc({ pid: 10, cmdline: SUPERVISOR, startMs: 100 }),
      proc({ pid: 20, cmdline: SUPERVISOR, startMs: 900 }),
    ],
    ONE,
    999,
    10
  )
  expect(said).toEqual([20])
})

test("the caller's own pid is never read as a process to supersede", () => {
  const said = selectSupersededTreePids(
    [
      proc({ pid: 10, cmdline: SUPERVISOR, startMs: 100 }),
      proc({ pid: 20, cmdline: SUPERVISOR, startMs: 900 }),
    ],
    ONE,
    20
  )
  expect(said).toEqual([])
})

test("the caller's own invocation is rejected up to the nearest agent process", () => {
  const entries = [
    proc({ pid: 10, cmdline: SUPERVISOR }),
    proc({ pid: 20, ppid: 10, cmdline: TASK }),
    proc({ pid: 21, ppid: 20, cmdline: TASK }),
    proc({ pid: 30, cmdline: CHILD }),
  ]
  expect(rejectSelfProc(entries, 21).map((e) => e.pid)).toEqual([10, 30])
})

test("a caller that is itself an agent process rejects only itself", () => {
  const entries = [
    proc({ pid: 10, cmdline: SUPERVISOR }),
    proc({ pid: 20, ppid: 10, cmdline: TASK }),
  ]
  expect(rejectSelfProc(entries, 10).map((e) => e.pid)).toEqual([20])
})

test("a caller standing in no entry rejects only its own pid", () => {
  const entries = [proc({ pid: 10, cmdline: SUPERVISOR })]
  expect(rejectSelfProc(entries, 777).map((e) => e.pid)).toEqual([10])
})
