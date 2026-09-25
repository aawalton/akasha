import { describe, expect, test } from "bun:test"
import {
  applyRecord,
  emptySubagentState,
  endedSubagents,
  LATE_WRITE_MS,
  runningSubagents,
  type SubagentState,
} from "akasha/code/editor/extension/modules/subagent-core/subagent-core.module.code.ts"

const ENDED_AT = "2026-09-25T16:44:37.764Z"

const ENDED_MS = Date.parse(ENDED_AT)

function launched(own: string): SubagentState {
  const state = emptySubagentState()
  applyRecord(state, {
    type: "assistant",
    message: {
      content: [{ type: "tool_use", name: "Agent", id: "t1", input: { description: "d" } }],
    },
  })
  applyRecord(state, {
    type: "user",
    message: { content: [{ type: "tool_result", tool_use_id: "t1" }] },
    toolUseResult: { isAsync: true, agentId: own },
  })
  return state
}

function ended(own: string, timestamp: string | null = ENDED_AT): SubagentState {
  const state = launched(own)
  applyRecord(state, {
    type: "user",
    timestamp,
    message: { content: `<task-notification>\n<task-id>${own}</task-id>\n</task-notification>` },
  })
  return state
}

const writtenAt =
  (at: number) =>
  (own: string): number | null =>
    own === "ag1" ? at : null

describe("a subagent resumed after it ended", () => {
  test("a subagent whose own transcript was written after its end was read is running again", () => {
    const state = ended("ag1")
    const late = writtenAt(ENDED_MS + LATE_WRITE_MS + 1)
    expect(runningSubagents(state, late).map((one) => one.agentId)).toEqual(["ag1"])
    expect(endedSubagents(state, late)).toEqual([])
  })

  test("a write inside the margin after its end leaves the subagent ended", () => {
    const state = ended("ag1")
    const close = writtenAt(ENDED_MS + LATE_WRITE_MS)
    expect(runningSubagents(state, close)).toEqual([])
    expect(endedSubagents(state, close)).toEqual(["ag1"])
  })

  test("a subagent whose own transcript is not found stays ended", () => {
    const state = ended("ag1")
    expect(runningSubagents(state, () => null)).toEqual([])
    expect(endedSubagents(state, () => null)).toEqual(["ag1"])
  })

  test("a reading naming no transcript leaves an ended subagent ended", () => {
    const state = ended("ag1")
    expect(runningSubagents(state)).toEqual([])
    expect(endedSubagents(state)).toEqual(["ag1"])
  })

  test("an end read with no time leaves the subagent ended however late it was written", () => {
    const state = ended("ag1", null)
    const late = writtenAt(Number.MAX_SAFE_INTEGER)
    expect(runningSubagents(state, late)).toEqual([])
    expect(endedSubagents(state, late)).toEqual(["ag1"])
  })

  test("a subagent that never ended is running whatever its transcript says", () => {
    const state = launched("ag1")
    expect(runningSubagents(state, () => null).map((one) => one.agentId)).toEqual(["ag1"])
    expect(endedSubagents(state, () => null)).toEqual([])
  })
})
