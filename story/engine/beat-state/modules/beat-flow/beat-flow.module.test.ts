import { expect, test } from "bun:test"
import {
  doneBy,
  filledOn,
  readyAcross,
  readyFor,
  shownThrough,
} from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.code.ts"
import { beatsOf } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.test-fixtures.ts"

const STATED = beatsOf(
  { beat: 1, event: "One." },
  { beat: 2, event: "Two." },
  { beat: 3, event: "Three." }
)

const CHANGE = { page: "metric-character/mara-xp", key: "value", from: 1, to: 2, note: "+1 XP" }

test("every beat the game master stated is ready for numbers in turn, the first one first", () => {
  expect(readyFor(STATED, "changes")).toBe(1)
  expect(readyFor(STATED, "prose")).toBeNull()
  expect(readyFor(STATED, "event")).toBeNull()
})

test("a beat is ready for a step once the step before has filled it and the step has filled the one before", () => {
  const numbered = beatsOf(
    { beat: 1, event: "One.", changes: [] },
    { beat: 2, event: "Two.", changes: [CHANGE] },
    { beat: 3, event: "Three." }
  )
  expect(readyFor(numbered, "changes")).toBe(3)
  expect(readyFor(numbered, "prose")).toBe(1)
  const told = beatsOf(
    { beat: 1, event: "One.", prose: "One told.", changes: [] },
    { beat: 2, event: "Two.", changes: [CHANGE] },
    { beat: 3, event: "Three." }
  )
  expect(readyFor(told, "prose")).toBe(2)
  expect(readyFor(told, "memory")).toBe(1)
  expect(readyFor(told, "pictured")).toBe(1)
})

test("a step that has filled every beat it can waits on the step before", () => {
  const waiting = beatsOf(
    { beat: 1, event: "One.", prose: "One told.", changes: [] },
    { beat: 2, event: "Two." }
  )
  expect(readyFor(waiting, "prose")).toBeNull()
})

test("an empty list fills a beat, and a list never stated leaves it unfilled", () => {
  const held = beatsOf({ beat: 1, event: "One.", memory: [] }, { beat: 2, event: "Two." })
  expect(filledOn(held, 1, "memory")).toBe(true)
  expect(filledOn(held, 2, "memory")).toBe(false)
  expect(filledOn(held, 1, "changes")).toBe(false)
})

test("a beat is shown once its numbers and prose are both in", () => {
  const held = beatsOf(
    { beat: 1, event: "One.", prose: "One told.", changes: [] },
    { beat: 2, event: "Two.", changes: [] },
    { beat: 3, event: "Three." }
  )
  expect(shownThrough(held)).toBe(1)
  expect(shownThrough(STATED)).toBe(0)
})

test("a step reaches a turn's first beat only once it has filled every beat of the turn before", () => {
  const before = beatsOf(
    { beat: 1, event: "One.", prose: "One told.", changes: [], memory: [] },
    { beat: 2, event: "Two.", prose: "Two told.", changes: [] }
  )
  const after = beatsOf({ beat: 1, event: "Next.", prose: "Next told.", changes: [] })
  expect(readyAcross([before, after], "memory")).toEqual({ turn: 0, beat: 2 })
  const remembered = beatsOf(
    { beat: 1, event: "One.", prose: "One told.", changes: [], memory: [] },
    { beat: 2, event: "Two.", prose: "Two told.", changes: [], memory: [] }
  )
  expect(doneBy(remembered, "memory")).toBe(true)
  expect(readyAcross([remembered, after], "memory")).toEqual({ turn: 1, beat: 1 })
  expect(readyAcross([remembered], "memory")).toBeNull()
})

test("a turn the game master has not stated holds every step at that turn", () => {
  const empty = beatsOf()
  expect(readyAcross([empty, STATED], "changes")).toBeNull()
})
