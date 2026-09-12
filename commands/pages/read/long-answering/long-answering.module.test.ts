import { expect, test } from "bun:test"
import type { Reading } from "akasha/agents/read-record/read-record.module.code.ts"
import { lettered } from "akasha/commands/modules/long-body/long-body.module.test-fixtures.ts"
import {
  afterIn,
  budgetFor,
  longAnswer,
  reachedTo,
} from "akasha/commands/pages/read/long-answering/long-answering.module.code.ts"

const CALLED_AS = "akasha read"

const HELD = "akasha/one/held.ts"

const OID = "1111111111111111111111111111111111111111"

function reading(oid: string, through: number | null): Reading {
  return { path: HELD, oid, seenAt: 0, carriedOid: null, readThrough: through }
}

test("a body longer than the room left over comes back a run with the call after it", () => {
  const answered = longAnswer({
    calledAs: CALLED_AS,
    named: HELD,
    text: lettered(40),
    after: 0,
    budget: 400,
  })
  expect(answered.refusal).toBeNull()
  expect(answered.run?.from).toBe(1)
  expect(answered.run?.of).toBe(40)
  expect(answered.lines[0]).toContain("of 40 follow")
  expect(answered.lines[1]).toBe(answered.run?.numbered)
  expect(answered.lines[answered.lines.length - 1]).toContain(CALLED_AS)
  expect(answered.lines[answered.lines.length - 1]).toContain(HELD)
})

test("a body the room left over holds whole comes back with no call after it", () => {
  const answered = longAnswer({
    calledAs: CALLED_AS,
    named: HELD,
    text: lettered(6),
    after: 0,
    budget: 100000,
  })
  expect(answered.refusal).toBeNull()
  expect(answered.run?.through).toBe(6)
  expect(answered.lines).toHaveLength(2)
  expect(answered.lines[0]).toContain("the whole body has reached you now")
})

test("a run begins after the line the record holds as already reached", () => {
  const answered = longAnswer({
    calledAs: CALLED_AS,
    named: HELD,
    text: lettered(40),
    after: 12,
    budget: 400,
  })
  expect(answered.run?.from).toBe(13)
})

test("a body no line of which fits the room left over answers a refusal, not a run", () => {
  const answered = longAnswer({
    calledAs: CALLED_AS,
    named: HELD,
    text: lettered(4),
    after: 0,
    budget: 10,
  })
  expect(answered.run).toBeNull()
  expect(answered.lines).toEqual([])
  expect(answered.refusal).toContain("no call returns this body")
})

test("a run short of the last line answers how far the body reached", () => {
  expect(reachedTo({ from: 1, through: 9, of: 40, numbered: "" })).toBe(9)
})

test("a run reaching the last line answers that the body was read whole", () => {
  expect(reachedTo({ from: 13, through: 40, of: 40, numbered: "" })).toBeNull()
})

test("a record of this body answers how far this body already reached", () => {
  expect(afterIn(reading(OID, 12), OID)).toBe(12)
})

test("a record naming another body answers nothing already reached", () => {
  expect(afterIn(reading("another oid", 12), OID)).toBe(0)
})

test("no record, and a record holding no reach, answer nothing already reached", () => {
  expect(afterIn(null, OID)).toBe(0)
  expect(afterIn(reading(OID, null), OID)).toBe(0)
})

test("the room left over for a body is never less than nothing", () => {
  expect(budgetFor(28000, 100, 900)).toBe(27000)
  expect(budgetFor(28000, 27000, 1000)).toBe(0)
  expect(budgetFor(28000, 90000, 900)).toBe(0)
})
