import { expect, test } from "bun:test"
import {
  type ClaimedCandidate,
  reconcileClaimedRedelivery,
} from "akasha/agent/message/modules/supervisor-claimed-reconcile/agent-message-supervisor-claimed-reconcile.module.code.ts"

const STARTED = 1_000

function reconciling(candidates: readonly ClaimedCandidate[], refusal: string | null = null) {
  const taken: string[] = []
  const released: string[] = []
  const said: string[] = []
  const run = reconcileClaimedRedelivery(
    { agentId: "agent", processStartedAtMs: STARTED },
    {
      readClaimed: async () => candidates,
      readTail: () => "",
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
  return { run, taken, released, said }
}

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
