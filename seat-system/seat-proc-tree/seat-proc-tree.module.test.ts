import { expect, test } from "bun:test"
import type { ProcLivenessEntry } from "../seat-proc-liveness/seat-proc-liveness.module.code.ts"
import {
  claudeChildProcsByAgent,
  newestProcStartMsByAgent,
  pickMainClaudePid,
  rejectSelfProc,
  selectSupersededTreePids,
  supervisedClaudePids,
} from "./seat-proc-tree.module.code.ts"

const ONE = "0199a1b2-c3d4-7e5f-8091-a2b3c4d5e6f7"

const CHILD = "claude --dangerously-skip-permissions"
const SUPERVISOR = "bun tools/lib/supervisor.ts"
const TASK = "bun tools/some-task.ts"

function proc(over: Partial<ProcLivenessEntry> & { pid: number }): ProcLivenessEntry {
  return { agentId: ONE, cmdline: CHILD, ...over }
}

test("the newest start is kept per agent, ignoring untimed and sleeping processes", () => {
  const said = newestProcStartMsByAgent([
    proc({ pid: 1, startMs: 100 }),
    proc({ pid: 2, startMs: 300, state: "D" }),
    proc({ pid: 3, startMs: 200 }),
    proc({ pid: 4 }),
  ])
  expect(said.get(ONE)).toBe(200)
})

test("only Claude children are gathered as an agent's children", () => {
  const said = claudeChildProcsByAgent([
    proc({ pid: 1, cmdline: CHILD }),
    proc({ pid: 2, cmdline: SUPERVISOR }),
  ])
  expect(said.get(ONE)?.map((c) => c.pid)).toEqual([1])
})

test("a child of the supervisor asking is preferred to a child of anything else", () => {
  const children = [
    { pid: 10, ppid: 99, startMs: 500 },
    { pid: 11, ppid: 7, startMs: 100 },
  ]
  expect(pickMainClaudePid(children, 7)).toBe(11)
  expect(supervisedClaudePids(children, 7)).toEqual([11])
})

test("where the supervisor fathered none, every child is in play", () => {
  const children = [
    { pid: 10, ppid: 99, startMs: 100 },
    { pid: 11, ppid: 98, startMs: 500 },
  ]
  expect(pickMainClaudePid(children, 7)).toBe(11)
  expect(supervisedClaudePids(children, 7)).toEqual([10, 11])
})

test("the main child is the newest where every candidate is timed", () => {
  expect(
    pickMainClaudePid(
      [
        { pid: 50, startMs: 100 },
        { pid: 10, startMs: 900 },
      ],
      null
    )
  ).toBe(10)
})

test("the main child is the highest pid where any candidate is untimed", () => {
  expect(pickMainClaudePid([{ pid: 50 }, { pid: 10, startMs: 900 }], null)).toBe(50)
})

test("the newest of two children started together is the higher pid", () => {
  expect(
    pickMainClaudePid(
      [
        { pid: 10, startMs: 100 },
        { pid: 50, startMs: 100 },
      ],
      null
    )
  ).toBe(50)
})

test("no children at all picks nothing", () => {
  expect(pickMainClaudePid([], null)).toBeUndefined()
})

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
