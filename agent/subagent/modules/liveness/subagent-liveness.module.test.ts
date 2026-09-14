import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  type Acting,
  namedAmong,
  readFor,
  readOf,
  type TranscriptAt,
  type Transcripts,
} from "akasha/agent/subagent/modules/liveness/subagent-liveness.module.code.ts"
import { createSubagentReader } from "akasha/code/editor/extension/modules/subagent-reading/subagent-reading.module.code.ts"

const OWN = "a38f63805f9b94edf"

const ANOTHER = "01a05844-6e60-7000-b54c-4b14559df70c"

const NOWHERE = "agent/subagent/pages/nowhere/nowhere.subagent.ts"

const SEAT = "01a09581-cb35-7000-b00f-7156d6b3ce13"

const TOOL = "toolu_0168n5DKr1aTfvBasn2f5c6B"

const ACTING: Acting = { seatId: SEAT, own: OWN }

const SCRATCH_AT = "/var/tmp"

function spawning(own: string): readonly unknown[] {
  return [
    {
      type: "assistant",
      message: {
        content: [{ type: "tool_use", id: TOOL, name: "Agent", input: { description: "a task" } }],
      },
    },
    {
      type: "user",
      message: { content: [{ type: "tool_result", tool_use_id: TOOL }] },
      toolUseResult: { isAsync: true, status: "async_launched", agentId: own },
    },
  ]
}

function resulting(own: string): unknown {
  return {
    type: "user",
    content:
      `<task-notification>\n<task-id>${own}</task-id>\n<tool-use-id>${TOOL}</tool-use-id>\n` +
      "<status>completed</status>\n</task-notification>",
  }
}

function written(at: string, records: readonly unknown[]): undefined {
  writeFileSync(at, records.map((one) => `${JSON.stringify(one)}\n`).join(""))
  return undefined
}

function transcribing(records: readonly unknown[], below: readonly unknown[] = []): TranscriptAt {
  const at = join(mkdtempSync(join(SCRATCH_AT, "subagent-liveness-")), "session.jsonl")
  written(at, records)
  if (below.length > 0) {
    const dir = join(at.replace(/\.jsonl$/, ""), "subagents")
    mkdirSync(dir, { recursive: true })
    written(join(dir, `agent-${ANOTHER}.jsonl`), below)
  }
  return () => at
}

const REFUSING: Transcripts = {
  readingForSeat: () => Promise.reject(new Error("EACCES: permission denied")),
  endedForSeat: () => Promise.reject(new Error("EACCES: permission denied")),
}

test("a transcript recording a spawn and no result for it reads working", async () => {
  const held = await readFor(ACTING, transcribing(spawning(OWN)), createSubagentReader())

  expect(held.liveness).toBe("working")
  expect(held.why).toContain("names it as running")
})

test("a transcript recording a result for it reads returned", async () => {
  const records = [...spawning(OWN), resulting(OWN)]
  const held = await readFor(ACTING, transcribing(records), createSubagentReader())

  expect(held.liveness).toBe("returned")
  expect(held.why).toContain("records the result it returned")
})

test("a result recorded below another subagent is read as one at the top is", async () => {
  const at = transcribing(spawning(ANOTHER), [...spawning(OWN), resulting(OWN)])
  const held = await readFor(ACTING, at, createSubagentReader())

  expect(held.liveness).toBe("returned")
  expect(held.why).toContain("records the result it returned")
})

test("a result recorded below a subagent that has itself returned is read", async () => {
  const at = transcribing(
    [...spawning(ANOTHER), resulting(ANOTHER)],
    [...spawning(OWN), resulting(OWN)]
  )
  const held = await readFor(ACTING, at, createSubagentReader())

  expect(held.liveness).toBe("returned")
  expect(held.why).toContain("records the result it returned")
})

test("a subagent still running below one that has returned is not read as returned", async () => {
  const at = transcribing([...spawning(ANOTHER), resulting(ANOTHER)], spawning(OWN))
  const held = await readFor(ACTING, at, createSubagentReader())

  expect(held.liveness).not.toBe("returned")
})

test("a transcript naming the subagent nowhere reads unread", async () => {
  const records = [...spawning(ANOTHER), resulting(ANOTHER)]
  const held = await readFor(ACTING, transcribing(records), createSubagentReader())

  expect(held.liveness).toBe("unread")
  expect(held.why).toContain("names it nowhere")
})

test("a transcript that could not be read reads unread", async () => {
  const held = await readFor(ACTING, () => "/var/tmp/subagent-liveness-refused.jsonl", REFUSING)

  expect(held.liveness).toBe("unread")
  expect(held.why).toContain("EACCES")
})

test("a seat stating no transcript reads as unread", async () => {
  const held = await readFor(ACTING, () => null, REFUSING)

  expect(held.liveness).toBe("unread")
  expect(held.why).toContain("states no transcript")
})

test("a subagent the transcript names below another is named as one at the top is", () => {
  const deep = { key: "c", label: "c", agentId: OWN, children: [] }
  const under = { key: "b", label: "b", agentId: ANOTHER, children: [deep] }
  expect(namedAmong([{ key: "a", label: "a", agentId: null, children: [under] }], OWN)).toBe(true)
})

test("a subagent the transcript names nowhere is named by nothing", () => {
  expect(namedAmong([{ key: "a", label: "a", agentId: ANOTHER, children: [] }], OWN)).toBe(false)
  expect(namedAmong([], OWN)).toBe(false)
})

test("a page whose own agent id will not be read reads as unread", async () => {
  expect((await readOf("/var/tmp/subagent-liveness-nowhere", NOWHERE)).liveness).toBe("unread")
})

test("a reading says which of its steps settled the answer", async () => {
  const held = await readOf("/var/tmp/subagent-liveness-nowhere", NOWHERE)

  expect(held.liveness).toBe("unread")
  expect(held.why).toContain("states no agent id")
})
