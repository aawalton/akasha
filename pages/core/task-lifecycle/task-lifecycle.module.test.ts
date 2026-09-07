import { expect, test } from "bun:test"
import {
  anchorFor,
  type CompletionShape,
  completedOnTheDayOf,
  completionShapeOf,
  completionValues,
  readsAsDone,
  uncompletionValues,
} from "./task-lifecycle.module.code.ts"

const AT = Date.parse("2026-09-06T22:00:00.000Z")

function shapeFor(pageTypeSlug: string): CompletionShape {
  const one = completionShapeOf(pageTypeSlug)
  if (one === null) throw new Error(`no completion shape names \`${pageTypeSlug}\``)
  return one
}

test("a page type nothing is declared for carries no completion shape", () => {
  expect(completionShapeOf("nav")).toBeNull()
})

test("a to-do holding no rule reads as done from the instant it was marked", () => {
  const said = completionValues(shapeFor("to-do"), { toDoDueDate: "2026-09-06" }, AT)
  expect(said).toEqual({
    toDoLastCompletedAt: "2026-09-06T22:00:00.000Z",
    toDoCompletedAt: "2026-09-06T22:00:00.000Z",
  })
})

test("a to-do holding a rule comes due again rather than reading as done", () => {
  const said = completionValues(
    shapeFor("to-do"),
    { toDoDueDate: "2026-09-06", toDoRecurrence: "FREQ=DAILY" },
    AT
  )
  expect(said.toDoCompletedAt).toBeUndefined()
  expect(said.toDoDueDate).toBe("2026-09-07")
  expect(said.toDoLastCompletedAt).toBe("2026-09-06T22:00:00.000Z")
})

test("a temper task holding a rule carries its next day and its stamp", () => {
  const said = completionValues(
    shapeFor("temper-task"),
    { dueDate: "2026-09-06", rruleRule: "FREQ=DAILY" },
    AT
  )
  expect(said).toEqual({ lastCompletedAt: "2026-09-06T22:00:00.000Z", dueDate: "2026-09-07" })
})

test("a task anchored from completion comes round from the day it was marked", () => {
  const shape = shapeFor("to-do")
  const held = { toDoDueDate: "2026-08-01", toDoAnchoredFromCompletion: true }
  expect(anchorFor(shape, held, AT)).toBe("2026-09-06")
})

test("a task anchored on nothing comes round from the day it was already due", () => {
  const shape = shapeFor("to-do")
  expect(anchorFor(shape, { toDoDueDate: "2026-08-01" }, AT)).toBe("2026-08-01")
})

test("an evening completion anchors on Alan's day rather than the UTC date", () => {
  const evening = Date.parse("2026-09-07T02:36:00.000Z")
  const shape = shapeFor("to-do")
  expect(anchorFor(shape, { toDoAnchoredFromCompletion: true }, evening)).toBe("2026-09-06")
})

test("a task marked earlier the same day reads as marked already", () => {
  const shape = shapeFor("to-do")
  const held = { toDoLastCompletedAt: "2026-09-06T14:00:00.000Z" }
  expect(completedOnTheDayOf(shape, held, AT)).toBe(true)
})

test("a task marked on an earlier day does not read as marked already", () => {
  const shape = shapeFor("to-do")
  const held = { toDoLastCompletedAt: "2026-09-04T14:00:00.000Z" }
  expect(completedOnTheDayOf(shape, held, AT)).toBe(false)
})

test("a task that will not parse its stamp does not read as marked already", () => {
  const shape = shapeFor("to-do")
  expect(completedOnTheDayOf(shape, { toDoLastCompletedAt: "not an instant" }, AT)).toBe(false)
})

test("a to-do reads as done only where it carries the key saying so", () => {
  const shape = shapeFor("to-do")
  expect(readsAsDone(shape, { toDoCompletedAt: "2026-09-06T22:00:00.000Z" })).toBe(true)
  expect(readsAsDone(shape, { toDoLastCompletedAt: "2026-09-06T22:00:00.000Z" })).toBe(false)
})

test("a temper task reads as done only where it carries the key saying so", () => {
  const shape = shapeFor("temper-task")
  expect(readsAsDone(shape, { completedAt: "2026-09-06T22:00:00.000Z" })).toBe(true)
  expect(readsAsDone(shape, { lastCompletedAt: "2026-09-06T22:00:00.000Z" })).toBe(false)
})

test("a temper task holding no rule reads as done from the instant it was marked", () => {
  const said = completionValues(shapeFor("temper-task"), { dueDate: "2026-09-06" }, AT)
  expect(said).toEqual({
    lastCompletedAt: "2026-09-06T22:00:00.000Z",
    completedAt: "2026-09-06T22:00:00.000Z",
  })
})

test("taking a completion back clears the key that said it was done", () => {
  expect(uncompletionValues(shapeFor("to-do"))).toEqual({
    toDoLastCompletedAt: null,
    toDoCompletedAt: null,
  })
  expect(uncompletionValues(shapeFor("temper-task"))).toEqual({
    lastCompletedAt: null,
    completedAt: null,
  })
})

test("a rule that answers no next day leaves the due date alone", () => {
  const said = completionValues(
    shapeFor("to-do"),
    { toDoDueDate: "2026-09-06", toDoRecurrence: "nonsense" },
    AT
  )
  expect(said.toDoDueDate).toBeUndefined()
  expect(said.toDoLastCompletedAt).toBe("2026-09-06T22:00:00.000Z")
})
