import { expect, test } from "bun:test"
import {
  CLIENT_STREAM_IDLE_CEILING_MS,
  decideQueueStep,
  type QueueStep,
  RESET_PROBE_MARGIN_MS,
  SILENT_QUEUE_BUDGET_MS,
  TRANSIENT_HOLD_HORIZON_MS,
} from "./queue-step.module.code.ts"

const NOW = 1_000_000

const DEFAULT_RESET_MS = NOW + 1_000

function stepFor(over: {
  earliestEligibleResetMs?: number | null
  silentElapsedMs?: number
  clientStream?: boolean
}): QueueStep {
  return decideQueueStep({
    earliestEligibleResetMs:
      over.earliestEligibleResetMs === undefined ? DEFAULT_RESET_MS : over.earliestEligibleResetMs,
    now: NOW,
    silentElapsedMs: over.silentElapsedMs ?? 0,
    silentBudgetMs: SILENT_QUEUE_BUDGET_MS,
    transientHoldHorizonMs: TRANSIENT_HOLD_HORIZON_MS,
    clientStream: over.clientStream ?? false,
  })
}

test("a queue with no reset ahead of it is exhausted", () => {
  expect(stepFor({ earliestEligibleResetMs: null })).toEqual({ kind: "exhaust" })
})

test("a reset further off than the transient hold horizon is exhausted", () => {
  const beyond = NOW + TRANSIENT_HOLD_HORIZON_MS + 1
  expect(stepFor({ earliestEligibleResetMs: beyond })).toEqual({ kind: "exhaust" })
})

test("a reset at the transient hold horizon is still waited for", () => {
  const atHorizon = NOW + TRANSIENT_HOLD_HORIZON_MS
  expect(stepFor({ earliestEligibleResetMs: atHorizon })).toEqual({
    kind: "wait",
    waitMs: SILENT_QUEUE_BUDGET_MS,
  })
})

test("a reset already past counts as no wait at all", () => {
  expect(stepFor({ earliestEligibleResetMs: NOW - 50_000 })).toEqual({
    kind: "wait",
    waitMs: RESET_PROBE_MARGIN_MS,
  })
})

test("a wait runs past its reset by the probe margin", () => {
  expect(stepFor({ earliestEligibleResetMs: NOW + 1_000 })).toEqual({
    kind: "wait",
    waitMs: 1_000 + RESET_PROBE_MARGIN_MS,
  })
})

test("a wait never runs past what is left of the silent budget", () => {
  const left = 200
  expect(
    stepFor({
      earliestEligibleResetMs: NOW + 1_000,
      silentElapsedMs: SILENT_QUEUE_BUDGET_MS - left,
    })
  ).toEqual({ kind: "wait", waitMs: left })
})

test("a spent silent budget ends the waiting", () => {
  const step = stepFor({ silentElapsedMs: SILENT_QUEUE_BUDGET_MS, clientStream: true })
  expect(step.kind).not.toBe("wait")
})

test("a spent budget commits where the client is streaming", () => {
  expect(stepFor({ silentElapsedMs: SILENT_QUEUE_BUDGET_MS, clientStream: true })).toEqual({
    kind: "commit",
  })
  expect(stepFor({ silentElapsedMs: SILENT_QUEUE_BUDGET_MS + 500, clientStream: true })).toEqual({
    kind: "commit",
  })
})

test("a spent budget exhausts where the client is not streaming", () => {
  expect(stepFor({ silentElapsedMs: SILENT_QUEUE_BUDGET_MS, clientStream: false })).toEqual({
    kind: "exhaust",
  })
})

test("the silent queue budget is under the ceiling a client stream idles out at", () => {
  expect(SILENT_QUEUE_BUDGET_MS).toBeLessThan(CLIENT_STREAM_IDLE_CEILING_MS)
})

test("nothing here reads a clock", () => {
  const args = {
    earliestEligibleResetMs: NOW + 1_000,
    now: NOW,
    silentElapsedMs: 0,
    silentBudgetMs: SILENT_QUEUE_BUDGET_MS,
    transientHoldHorizonMs: TRANSIENT_HOLD_HORIZON_MS,
    clientStream: false,
  }
  const first = decideQueueStep(args)
  const second = decideQueueStep(args)
  expect(second).toEqual(first)
  expect(first).toEqual({ kind: "wait", waitMs: 1_000 + RESET_PROBE_MARGIN_MS })
})

test("nothing here waits", () => {
  const startedAt = Date.now()
  const step = stepFor({ earliestEligibleResetMs: NOW + 60_000 })
  expect(step).toEqual({ kind: "wait", waitMs: SILENT_QUEUE_BUDGET_MS })
  expect(Date.now() - startedAt).toBeLessThan(1_000)
})
