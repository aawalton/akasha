import { expect, test } from "bun:test"
import {
  COMPACT_AT_TOKENS,
  type CompactObservation,
  shouldCompact,
  stillAsked,
  worthProbing,
} from "akasha/agent/seat/supervisor/supervisor-compacting/modules/supervisor-compact-decide/supervisor-compact-decide.module.code.ts"

const FULL: CompactObservation = {
  idle: true,
  compacting: false,
  contextTokens: COMPACT_AT_TOKENS,
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

test("a seat is worth a probe before anything reads whether it is idle", () => {
  expect(worthProbing({ compacting: false, contextTokens: COMPACT_AT_TOKENS }, false)).toBe(true)
  expect(worthProbing({ compacting: false, contextTokens: 1 }, false)).toBe(false)
})

test("the ask clears once the context is read under the ceiling", () => {
  expect(stillAsked(true, 1)).toBe(false)
  expect(stillAsked(true, COMPACT_AT_TOKENS)).toBe(true)
})

test("a context that was not read holds the ask", () => {
  expect(stillAsked(true, null)).toBe(true)
})

test("a seat never asked holds no ask", () => {
  expect(stillAsked(false, null)).toBe(false)
})
