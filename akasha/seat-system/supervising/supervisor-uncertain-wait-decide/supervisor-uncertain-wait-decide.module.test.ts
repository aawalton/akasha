import { expect, test } from "bun:test"
import {
  decideUncertainBlockBatch,
  decideUncertainBlockEscalation,
  INITIAL_UNCERTAIN_BLOCK_STATE,
  UNCERTAIN_BLOCK_ESCALATE_MS,
} from "./supervisor-uncertain-wait-decide.module.code.ts"

const NOW = 4_000_000

const BOUND = UNCERTAIN_BLOCK_ESCALATE_MS

test("a seat that is not blocked forgets how long it was blocked for", () => {
  const said = decideUncertainBlockEscalation(
    { sinceMs: 1, escalated: true },
    { blockedByUncertainClaimant: false, nowMs: NOW, boundMs: BOUND }
  )
  expect(said).toEqual({ state: INITIAL_UNCERTAIN_BLOCK_STATE, escalate: false })
})

test("the first blocked tick starts the clock and escalates nothing", () => {
  const said = decideUncertainBlockEscalation(INITIAL_UNCERTAIN_BLOCK_STATE, {
    blockedByUncertainClaimant: true,
    nowMs: NOW,
    boundMs: BOUND,
  })
  expect(said).toEqual({ state: { sinceMs: NOW, escalated: false }, escalate: false })
})

test("a block escalates once the bound has passed", () => {
  const said = decideUncertainBlockEscalation(
    { sinceMs: NOW - BOUND, escalated: false },
    { blockedByUncertainClaimant: true, nowMs: NOW, boundMs: BOUND }
  )
  expect(said).toEqual({ state: { sinceMs: NOW - BOUND, escalated: true }, escalate: true })
})

test("one unbroken block escalates once", () => {
  const said = decideUncertainBlockEscalation(
    { sinceMs: NOW - BOUND * 10, escalated: true },
    { blockedByUncertainClaimant: true, nowMs: NOW, boundMs: BOUND }
  )
  expect(said.escalate).toBe(false)
})

test("a block escalates again after the seat came unblocked in between", () => {
  const cleared = decideUncertainBlockEscalation(
    { sinceMs: NOW - BOUND, escalated: true },
    { blockedByUncertainClaimant: false, nowMs: NOW, boundMs: BOUND }
  )
  const again = decideUncertainBlockEscalation(cleared.state, {
    blockedByUncertainClaimant: true,
    nowMs: NOW + 1,
    boundMs: 0,
  })
  expect(again.escalate).toBe(true)
})

test("a batch answers each seat under its own reading and keeps the seat's name", () => {
  const said = decideUncertainBlockBatch([
    {
      seat: "one",
      state: { sinceMs: NOW - BOUND, escalated: false },
      reading: { blockedByUncertainClaimant: true, nowMs: NOW, boundMs: BOUND },
    },
    {
      seat: "two",
      state: INITIAL_UNCERTAIN_BLOCK_STATE,
      reading: { blockedByUncertainClaimant: false, nowMs: NOW, boundMs: BOUND },
    },
  ])
  expect(said.map((one) => [one.seat, one.escalate])).toEqual([
    ["one", true],
    ["two", false],
  ])
})
