import { expect, test } from "bun:test"
import type { PoolSummary } from "../../../../claude-accounts/modules/selection/claude-account-selection.module.code.ts"
import type { AccountState } from "../oauth-types/oauth-types.module.code.ts"
import { SILENT_QUEUE_BUDGET_MS } from "../queue-step/queue-step.module.code.ts"
import {
  commitLine,
  exhaustLine,
  type QueueDoors,
  type QueueOutcome,
  resetSaid,
  runPreForwardQueue,
  waitLine,
} from "./pre-forward-queue.module.code.ts"

const PREFIX = "[gw]"

const METHOD = "POST"

const PATH = "/v1/messages"

const NOW = 1_700_000_000_000

const TRAIL = "aine,ctw"

const REASON = "pool-empty"

const SUMMARY: PoolSummary = { eligibleCount: 0, totalCount: 2, earliestEligibleResetMs: null }

function stateOf(account: string, fiveHourUtil: number, resetsAt: string | null): AccountState {
  return {
    account,
    fiveHourUtil,
    sevenDayUtil: 0,
    sevenDayResetsAt: null,
    fiveHourResetsAt: resetsAt,
    subscriptionType: null,
    subscriptionDisabled: false,
    fiveHourAtLimitUntil: null,
    renewalTerminal: false,
    accessTokenExpiresAt: null,
  }
}

function bodyOf(held: unknown): ArrayBuffer {
  const bytes = new TextEncoder().encode(JSON.stringify(held))
  const out = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(out).set(bytes)
  return out
}

const EMPTY: QueueOutcome = { kind: "empty-pool", reason: REASON, trailDisplay: TRAIL }

type Rig = {
  readonly doors: QueueDoors
  readonly lines: string[]
  readonly slept: number[]
  readonly committed: string[]
  readonly refused: { summary: PoolSummary; now: number }[]
  readonly turns: () => number
  readonly reads: () => number
}

function rigged(outcomes: readonly QueueOutcome[], states: readonly AccountState[]): Rig {
  const lines: string[] = []
  const slept: number[] = []
  const committed: string[] = []
  const refused: { summary: PoolSummary; now: number }[] = []
  let turn = 0
  let reads = 0
  const doors: QueueDoors = {
    attempted: async () => {
      const answer = outcomes[Math.min(turn, outcomes.length - 1)] ?? EMPTY
      turn += 1
      return answer
    },
    committed: (reason) => {
      committed.push(reason)
      return new Response("committed", { status: 200 })
    },
    rateLimited: (summary, now) => {
      refused.push({ summary, now })
      return new Response("refused", { status: 429 })
    },
    pacing: async () => {
      reads += 1
      return new Map(states.map((one) => [one.account, one]))
    },
    slept: async (ms) => {
      slept.push(ms)
    },
    now: () => NOW,
    said: (line) => {
      lines.push(line)
    },
  }
  return {
    doors,
    lines,
    slept,
    committed,
    refused,
    turns: () => turn,
    reads: () => reads,
  }
}

function run(rig: Rig, body: ArrayBuffer | null = null): Promise<Response> {
  return runPreForwardQueue({
    logPrefix: PREFIX,
    method: METHOD,
    pathname: PATH,
    originalBody: body,
    doors: rig.doors,
  })
}

const SERVED: QueueOutcome = { kind: "served", response: new Response("ok", { status: 200 }) }

const MAXED = stateOf("aine", 100, new Date(NOW + 30_000).toISOString())

const FAR = stateOf("ctw", 100, new Date(NOW + 600_000).toISOString())

const UNKNOWN_RESET = stateOf("zed", 100, null)

test("an attempt that served a response answers with that response", async () => {
  const rig = rigged([SERVED], [])
  const res = await run(rig)
  expect(res.status).toBe(200)
  expect(await res.text()).toBe("ok")
  expect(rig.turns()).toBe(1)
  expect(rig.reads()).toBe(0)
  expect(rig.lines).toEqual([])
})

test("an attempt that found no account reads the pacing of every account", async () => {
  const rig = rigged([EMPTY, SERVED], [MAXED])
  await run(rig)
  expect(rig.reads()).toBe(1)
  expect(rig.turns()).toBe(2)
})

test("a wait step sleeps the span that step names and tries again", async () => {
  const rig = rigged([EMPTY, SERVED], [MAXED])
  const res = await run(rig)
  expect(res.status).toBe(200)
  expect(rig.slept).toEqual([6_000])
  expect(rig.lines.length).toBe(1)
  expect(rig.lines[0]).toContain("phase=silent-reprobe")
  expect(rig.lines[0]).toContain("wait=6000ms")
  expect(rig.lines[0]).toContain("silentElapsed=0ms")
})

test("a wait step adds the span slept to the silent elapsed", async () => {
  const near = stateOf("aine", 100, new Date(NOW + 500).toISOString())
  const rig = rigged([EMPTY, EMPTY, EMPTY, SERVED], [near])
  await run(rig)
  expect(rig.slept).toEqual([1_000, 1_000, 1_000])
  expect(rig.lines[1]).toContain("silentElapsed=1000ms")
  expect(rig.lines[2]).toContain("silentElapsed=2000ms")
})

test("a wait line says nothing about how the accounts are placed", async () => {
  const rig = rigged([EMPTY, SERVED], [MAXED])
  await run(rig)
  expect(rig.lines[0]).not.toContain("eligibility=")
})

test("a client stream whose budget is spent commits", async () => {
  const near = stateOf("aine", 100, new Date(NOW + 500).toISOString())
  const rig = rigged([EMPTY], [near])
  const res = await run(rig, bodyOf({ stream: true }))
  expect(res.status).toBe(200)
  expect(await res.text()).toBe("committed")
  expect(rig.committed).toEqual([REASON])
  const commit = rig.lines[rig.lines.length - 1] ?? ""
  expect(commit).toContain("phase=commit-keepalive")
  expect(commit).toContain("eligibility=[aine=five-hour-maxed]")
  expect(rig.slept.reduce((at, to) => at + to, 0)).toBeGreaterThanOrEqual(SILENT_QUEUE_BUDGET_MS)
})

test("a request that is no client stream exhausts once the budget is spent", async () => {
  const near = stateOf("aine", 100, new Date(NOW + 500).toISOString())
  const rig = rigged([EMPTY], [near])
  const res = await run(rig, bodyOf({ stream: false }))
  expect(res.status).toBe(429)
  expect(rig.committed).toEqual([])
  expect(rig.refused.length).toBe(1)
})

test("a request carrying no body is no client stream", async () => {
  const near = stateOf("aine", 100, new Date(NOW + 500).toISOString())
  const rig = rigged([EMPTY], [near])
  expect((await run(rig, null)).status).toBe(429)
})

test("an earliest reset that is absent exhausts on the first turn", async () => {
  const rig = rigged([EMPTY], [UNKNOWN_RESET])
  const res = await run(rig, bodyOf({ stream: true }))
  expect(res.status).toBe(429)
  expect(rig.slept).toEqual([])
  expect(rig.turns()).toBe(1)
})

test("a reset beyond the hold horizon exhausts rather than waiting", async () => {
  const rig = rigged([EMPTY], [FAR])
  const res = await run(rig, bodyOf({ stream: true }))
  expect(res.status).toBe(429)
  expect(rig.slept).toEqual([])
})

test("an exhaust step tells the rate-limit response the summary and the moment", async () => {
  const rig = rigged([EMPTY], [UNKNOWN_RESET])
  await run(rig)
  expect(rig.refused[0]?.now).toBe(NOW)
  expect(rig.refused[0]?.summary).toEqual({
    eligibleCount: 0,
    totalCount: 1,
    earliestEligibleResetMs: null,
  })
})

test("an exhaust line names the eligible count against the total", async () => {
  const rig = rigged([EMPTY], [UNKNOWN_RESET, stateOf("aine", 0, null)])
  await run(rig)
  const line = rig.lines[0] ?? ""
  expect(line).toContain("status=429")
  expect(line).toContain(`rebind=${REASON}`)
  expect(line).toContain("pool=1/2")
  expect(line).toContain("earliestReset=unknown")
  expect(line).toContain("eligibility=[zed=five-hour-maxed aine=eligible]")
})

test("every line names the account trail the attempt answered with", async () => {
  const rig = rigged([EMPTY, SERVED], [MAXED])
  await run(rig)
  for (const line of rig.lines) expect(line).toContain(`account=${TRAIL}`)
})

test("an earliest reset that is absent is written as `unknown`", () => {
  expect(resetSaid(null)).toBe("unknown")
  expect(resetSaid(NOW)).toBe(String(NOW))
})

test("a wait line names the request, the reason and the earliest reset", () => {
  expect(
    waitLine({
      logPrefix: PREFIX,
      method: METHOD,
      pathname: PATH,
      trailDisplay: TRAIL,
      reason: REASON,
      waitMs: 700,
      silentElapsedMs: 300,
      summary: { eligibleCount: 0, totalCount: 3, earliestEligibleResetMs: NOW },
    })
  ).toBe(
    `${PREFIX} pre-forward-queue ${METHOD} ${PATH} account=${TRAIL} phase=silent-reprobe ` +
      `reason=${REASON} wait=700ms silentElapsed=300ms earliestReset=${NOW}`
  )
})

test("a commit line names how every account is placed", () => {
  expect(
    commitLine({
      logPrefix: PREFIX,
      method: METHOD,
      pathname: PATH,
      trailDisplay: TRAIL,
      reason: REASON,
      silentElapsedMs: 6_000,
      summary: SUMMARY,
      eligibility: "aine=eligible",
    })
  ).toBe(
    `${PREFIX} pre-forward-queue ${METHOD} ${PATH} account=${TRAIL} phase=commit-keepalive ` +
      `reason=${REASON} silentElapsed=6000ms earliestReset=unknown eligibility=[aine=eligible]`
  )
})

test("an exhaust line names the pool and how every account is placed", () => {
  expect(
    exhaustLine({
      logPrefix: PREFIX,
      method: METHOD,
      pathname: PATH,
      trailDisplay: TRAIL,
      reason: REASON,
      summary: { eligibleCount: 1, totalCount: 4, earliestEligibleResetMs: NOW },
      eligibility: "aine=eligible",
    })
  ).toBe(
    `${PREFIX} res ${METHOD} ${PATH} account=${TRAIL} status=429 rebind=${REASON} ` +
      `pool=1/4 earliestReset=${NOW} eligibility=[aine=eligible]`
  )
})

test("an attempt that throws is thrown on to the caller", async () => {
  const rig = rigged([EMPTY], [MAXED])
  const doors: QueueDoors = {
    ...rig.doors,
    attempted: async () => {
      throw new Error("the pipeline is refused")
    },
  }
  await expect(
    runPreForwardQueue({
      logPrefix: PREFIX,
      method: METHOD,
      pathname: PATH,
      originalBody: null,
      doors,
    })
  ).rejects.toThrow("the pipeline is refused")
})

test("nothing here holds a clock the caller cannot replace", async () => {
  const rig = rigged([EMPTY], [UNKNOWN_RESET])
  await run(rig)
  expect(rig.refused[0]?.now).toBe(NOW)
  expect(Date.now()).not.toBe(NOW)
})
