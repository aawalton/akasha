import { expect, test } from "bun:test"
import {
  betweenTurns,
  type CompactObservation,
  shouldCompact,
  stillAsked,
  worthProbing,
} from "akasha/agent/seat/supervisor/seat-auto-compact/modules/supervisor-compact-decide/supervisor-compact-decide.module.code.ts"

const COMPACT_AT_TOKENS = 350_000

const FULL: CompactObservation = {
  idle: true,
  compacting: false,
  contextTokens: COMPACT_AT_TOKENS,
  ceiling: COMPACT_AT_TOKENS,
}

test("an idle seat at the ceiling is asked to compact", () => {
  expect(shouldCompact(FULL, false)).toBe(true)
})

test("a seat one token under the ceiling is not asked", () => {
  expect(shouldCompact({ ...FULL, contextTokens: COMPACT_AT_TOKENS - 1 }, false)).toBe(false)
})

test("a busy seat at the ceiling is not asked", () => {
  expect(shouldCompact({ ...FULL, idle: false }, false)).toBe(false)
})

test("a seat already compacting is not asked", () => {
  expect(shouldCompact({ ...FULL, compacting: true }, false)).toBe(false)
})

test("a seat whose context was not read is not asked", () => {
  expect(shouldCompact({ ...FULL, contextTokens: null }, false)).toBe(false)
})

test("a seat asked already is not asked again", () => {
  expect(shouldCompact(FULL, true)).toBe(false)
})

test("a seat whose ceiling could not be read is not asked", () => {
  expect(shouldCompact({ ...FULL, ceiling: null }, false)).toBe(false)
})

test("a ceiling the conditions lowered asks a seat that was under the old one", () => {
  const held = { ...FULL, contextTokens: 200_000 }
  expect(shouldCompact(held, false)).toBe(false)
  expect(shouldCompact({ ...held, ceiling: 150_000 }, false)).toBe(true)
})

test("a seat is worth a probe before anything reads whether it is idle", () => {
  const reading = { compacting: false, ceiling: COMPACT_AT_TOKENS }
  expect(worthProbing({ ...reading, contextTokens: COMPACT_AT_TOKENS }, false)).toBe(true)
  expect(worthProbing({ ...reading, contextTokens: 1 }, false)).toBe(false)
})

test("the ask clears once the context is read under the ceiling", () => {
  expect(stillAsked(true, 1, COMPACT_AT_TOKENS)).toBe(false)
  expect(stillAsked(true, COMPACT_AT_TOKENS, COMPACT_AT_TOKENS)).toBe(true)
})

test("a context that was not read holds the ask", () => {
  expect(stillAsked(true, null, COMPACT_AT_TOKENS)).toBe(true)
})

test("a seat never asked holds no ask", () => {
  expect(stillAsked(false, null, COMPACT_AT_TOKENS)).toBe(false)
})

test("a seat between turns with nothing being sent is idle", () => {
  expect(betweenTurns({ activeTurn: false, sendInFlight: false })).toBe(true)
})

test("a seat mid-turn is not idle", () => {
  expect(betweenTurns({ activeTurn: true, sendInFlight: false })).toBe(false)
})

test("a seat whose turn was never read is not idle", () => {
  expect(betweenTurns({ activeTurn: undefined, sendInFlight: false })).toBe(false)
})

test("a seat with a send in flight is not idle", () => {
  expect(betweenTurns({ activeTurn: false, sendInFlight: true })).toBe(false)
})
