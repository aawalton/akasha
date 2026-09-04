import { expect, test } from "bun:test"
import { selectPriorTreePids } from "./seat-recovery.module.code.ts"

const BY_ID = new Map<string, readonly number[]>([
  ["agent-a", [11, 22, 33]],
  ["agent-b", [44]],
])

test("the process doing the reaping is never reaped", () => {
  expect(selectPriorTreePids(BY_ID, "agent-a", 22)).toEqual([11, 33])
})

test("only the named agent's tree is reaped", () => {
  expect(selectPriorTreePids(BY_ID, "agent-b", 1)).toEqual([44])
})

test("an agent with no tree standing reaps nothing", () => {
  expect(selectPriorTreePids(BY_ID, "agent-nowhere", 1)).toEqual([])
})

test("a tree holding only the reaper reaps nothing", () => {
  expect(selectPriorTreePids(new Map([["agent-c", [9]]]), "agent-c", 9)).toEqual([])
})
