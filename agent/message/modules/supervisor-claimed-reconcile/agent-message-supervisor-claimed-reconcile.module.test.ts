import { expect, test } from "bun:test"
import {
  type ClaimedCandidate,
  reconcileClaimedRedelivery,
} from "akasha/agent/message/modules/supervisor-claimed-reconcile/agent-message-supervisor-claimed-reconcile.module.code.ts"

const STARTED = 1_000

function reconciling(
  candidates: readonly ClaimedCandidate[],
  refusal: string | null = null,
  transcript = ""
) {
  const taken: string[] = []
  const released: string[] = []
  const said: string[] = []
  const readSince: number[] = []
  const run = reconcileClaimedRedelivery(
    { agentId: "agent", processStartedAtMs: STARTED },
    {
      readClaimed: async () => candidates,
      readTranscripts: (_agent, sinceMs) => {
        readSince.push(sinceMs)
        return transcript
      },
      waitForRedeliveryWindow: async () => true,
      release: async (id) => {
        released.push(id)
      },
      take: async (id) => {
        taken.push(id)
        return refusal
      },
      log: (message) => said.push(message),
      logError: (message) => said.push(message),
    }
  )
  return { run, taken, released, said, readSince }
}

function delivered(id: string): string {
  const wrapper = `<channel source="messages" sender="story-turn" message_id="${id}">The turn is at writer.</channel>`
  const filler = Array.from({ length: 2_000 }, (_, at) =>
    JSON.stringify({ type: "assistant", message: { stop_reason: "tool_use" }, at })
  )
  return [
    JSON.stringify({ type: "queue-operation", operation: "enqueue", content: wrapper }),
    JSON.stringify({ type: "user", message: { content: wrapper } }),
    ...filler,
  ].join("\n")
}

test("a claim the seat's transcripts show delivered, however long ago, is taken and never let go", async () => {
  const { run, taken, released } = reconciling(
    [{ id: "message-6b9d4a4a2d5b", claimedAtMs: STARTED - 1, injectedAtMs: null }],
    null,
    delivered("message-6b9d4a4a2d5b")
  )
  await run
  expect(taken).toEqual(["message-6b9d4a4a2d5b"])
  expect(released).toEqual([])
})

test("the seat's transcripts are read from the oldest claim on", async () => {
  const { run, readSince } = reconciling([
    { id: "later", claimedAtMs: STARTED - 1, injectedAtMs: null },
    { id: "older", claimedAtMs: STARTED - 500, injectedAtMs: null },
  ])
  await run
  expect(readSince).toEqual([STARTED - 500])
})

test("a claim marked shown is taken rather than left claimed or let go", async () => {
  const { run, taken, released } = reconciling([
    { id: "shown", claimedAtMs: STARTED - 1, injectedAtMs: STARTED - 1 },
  ])
  await run
  expect(taken).toEqual(["shown"])
  expect(released).toEqual([])
})

test("a take refused on resume is said and the claim is not let go", async () => {
  const { run, taken, released, said } = reconciling(
    [{ id: "shown", claimedAtMs: STARTED - 1, injectedAtMs: STARTED - 1 }],
    "the pages answered 502"
  )
  await run
  expect(taken).toEqual(["shown"])
  expect(released).toEqual([])
  expect(said.some((line) => line.includes("the pages answered 502"))).toBe(true)
})

test("a claim with no sign it reached the seat is let go rather than taken", async () => {
  const { run, taken, released } = reconciling([
    { id: "lost", claimedAtMs: STARTED - 1, injectedAtMs: null },
  ])
  await run
  expect(taken).toEqual([])
  expect(released).toEqual(["lost"])
})

test("a claim made since this process started is neither taken nor let go", async () => {
  const { run, taken, released } = reconciling([
    { id: "fresh", claimedAtMs: STARTED, injectedAtMs: STARTED },
  ])
  await run
  expect(taken).toEqual([])
  expect(released).toEqual([])
})
