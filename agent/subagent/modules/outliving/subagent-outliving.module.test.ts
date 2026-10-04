import { expect, test } from "bun:test"
import {
  clientPidIn,
  outlived,
  outlivedAmong,
  subagentsDirOf,
} from "akasha/agent/subagent/modules/outliving/subagent-outliving.module.code.ts"

const SEAT = "01a0f94b-f18d-7000-bb44-281f39671025"

const SUPERVISOR = {
  agentId: SEAT,
  pid: 10,
  ppid: 1,
  cmdline: "bun run /repo/run-supervisor.module.code.ts",
}

const CLIENT = {
  agentId: SEAT,
  pid: 11,
  ppid: 10,
  cmdline: "claude --dangerously-skip-permissions",
}

test("a seat's client is the Claude child under its supervisor rather than the supervisor", () => {
  expect(clientPidIn([SUPERVISOR, CLIENT], () => 10)(SEAT)).toBe(11)
})

test("a supervisor with no Claude child under it gives its seat no client", () => {
  expect(clientPidIn([SUPERVISOR], () => 10)(SEAT)).toBeNull()
})

test("a seat stating no supervisor has no client", () => {
  expect(clientPidIn([SUPERVISOR, CLIENT], () => null)(SEAT)).toBeNull()
})

test("a record written after the supervisor started and before the client started is outlived", () => {
  const startedAt: Record<number, number> = { 10: 100, 11: 300 }
  const client = clientPidIn([SUPERVISOR, CLIENT], () => 10)(SEAT)
  const start = client === null ? null : (startedAt[client] ?? null)
  expect([...outlivedAmong(["between"], "/dir", start, () => 200)]).toEqual(["between"])
})

test("a last record written before the client started is outlived by that client", () => {
  expect(outlived(200, 100)).toBe(true)
})

test("a last record written after the client started is not outlived", () => {
  expect(outlived(100, 200)).toBe(false)
})

test("a last record written as the client started is not outlived", () => {
  expect(outlived(200, 200)).toBe(false)
})

test("a client whose start is unknown outlives nothing", () => {
  expect(outlived(null, 100)).toBe(false)
})

test("a subagent that wrote no record at all is outlived by nothing", () => {
  expect(outlived(200, null)).toBe(false)
})

test("the subagents folder sits under the transcript's own name beside it", () => {
  expect(subagentsDirOf("/held/64bf.jsonl")).toBe("/held/64bf/subagents")
})

test("only the subagents whose last record predates the start are named", () => {
  const at: Record<string, number> = { early: 100, late: 300 }
  const found = outlivedAmong(
    ["early", "late", "never"],
    "/dir",
    200,
    (_dir, own) => at[own] ?? null
  )
  expect([...found]).toEqual(["early"])
})

test("a client whose start is unknown names nobody", () => {
  expect([...outlivedAmong(["early"], "/dir", null, () => 100)]).toEqual([])
})

test("a name that is empty is asked about nowhere", () => {
  const asked: string[] = []
  outlivedAmong(["", "one"], "/dir", 200, (_dir, own) => {
    asked.push(own)
    return null
  })
  expect(asked).toEqual(["one"])
})
