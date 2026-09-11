import { expect, test } from "bun:test"
import {
  outlived,
  outlivedAmong,
  subagentsDirOf,
} from "akasha/seat-system/subagent-outliving/subagent-outliving.module.code.ts"

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
