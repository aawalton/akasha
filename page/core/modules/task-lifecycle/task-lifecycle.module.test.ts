import { expect, test } from "bun:test"
import {
  anchorFor,
  COLLECTION_SHAPE,
  completedOnTheDayOf,
  completionShapeAlong,
  completionValues,
  readsAsDone,
  type TaskShape,
  uncompletionValues,
} from "akasha/page/core/modules/task-lifecycle/task-lifecycle.module.code.ts"

const AT = Date.parse("2026-09-06T22:00:00.000Z")

function shapeFor(pageTypeSlug: string): TaskShape {
  const one = completionShapeAlong([pageTypeSlug])
  if (one?.kind !== "task") throw new Error(`no task completion shape names \`${pageTypeSlug}\``)
  return one
}

test("a page type nothing is declared for carries no completion shape", () => {
  expect(completionShapeAlong(["nav", "page"])).toBeNull()
})

test("a page type extending a collection takes the collection's completion shape", () => {
  const chain = ["story-chapter-read", "chapter", "collection", "collection-external", "page"]
  expect(completionShapeAlong(chain)).toBe(COLLECTION_SHAPE)
})

test("the nearest page type declaring a completion shape answers for the chain", () => {
  expect(completionShapeAlong(["to-do", "collection", "page"])?.kind).toBe("task")
})

test("checking a collection carries its own progress to its own length and stamps it", () => {
  const said = completionValues(COLLECTION_SHAPE, { ownLength: 4200, ownProgress: 300 }, AT)
  expect(said).toEqual({ completedAt: "2026-09-06T22:00:00.000Z", ownProgress: 4200 })
})

test("checking a collection stating no length of its own stamps it alone", () => {
  const said = completionValues(COLLECTION_SHAPE, { ownProgress: 3 }, AT)
  expect(said).toEqual({ completedAt: "2026-09-06T22:00:00.000Z" })
})

test("unchecking a collection clears its stamp and its own progress", () => {
  expect(uncompletionValues(COLLECTION_SHAPE)).toEqual({ completedAt: null, ownProgress: 0 })
})

test("a collection reads as done where its own progress reaches its own length", () => {
  expect(readsAsDone(COLLECTION_SHAPE, { ownLength: 4200, ownProgress: 4200 })).toBe(true)
  expect(readsAsDone(COLLECTION_SHAPE, { ownLength: 4200, ownProgress: 4199 })).toBe(false)
})

test("a collection stamped done but short of its own length reads as not done", () => {
  const held = { ownLength: 4200, ownProgress: 10, completedAt: "2026-09-06T22:00:00.000Z" }
  expect(readsAsDone(COLLECTION_SHAPE, held)).toBe(false)
})

test("a collection stating no length of its own reads as done where it is stamped", () => {
  expect(readsAsDone(COLLECTION_SHAPE, { completedAt: "2026-09-06T22:00:00.000Z" })).toBe(true)
  expect(readsAsDone(COLLECTION_SHAPE, {})).toBe(false)
})

test("a checked collection reads as done and an unchecked one reads as not done", () => {
  const held = { ownLength: 12, ownProgress: 5 }
  const checked = { ...held, ...completionValues(COLLECTION_SHAPE, held, AT) }
  expect(readsAsDone(COLLECTION_SHAPE, checked)).toBe(true)
  const unchecked = { ...checked, ...uncompletionValues(COLLECTION_SHAPE) }
  expect(readsAsDone(COLLECTION_SHAPE, unchecked)).toBe(false)
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

test("an anchor written as the text true is read as true", () => {
  const shape = shapeFor("temper-task")
  expect(anchorFor(shape, { dueDate: "2026-08-01", rruleAnchorFromCompletion: "true" }, AT)).toBe(
    "2026-09-06"
  )
})

test("a completion captured on an earlier day comes round from the clock", () => {
  const captured = Date.parse("2026-08-01T18:00:00.000Z")
  const said = completionValues(
    shapeFor("temper-task"),
    { dueDate: "2026-07-31", rruleRule: "FREQ=DAILY" },
    captured,
    AT
  )
  expect(said.dueDate).toBe("2026-09-07")
  expect(said.lastCompletedAt).toBe("2026-08-01T18:00:00.000Z")
})

test("a second marking on the day of the first leaves the due date where it was", () => {
  const said = completionValues(
    shapeFor("to-do"),
    {
      toDoDueDate: "2026-09-07",
      toDoRecurrence: "FREQ=DAILY",
      toDoLastCompletedAt: "2026-09-06T14:00:00.000Z",
    },
    AT
  )
  expect(said.toDoDueDate).toBeUndefined()
  expect(said.toDoLastCompletedAt).toBe("2026-09-06T22:00:00.000Z")
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
