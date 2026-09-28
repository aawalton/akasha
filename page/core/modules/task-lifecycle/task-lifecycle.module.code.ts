import {
  getEsoDayStr,
  getEsoResetTime,
} from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.module.code.ts"
import { advanceRecurrenceDueDate } from "akasha/alan/harness/recurrence/modules/scheduling/scheduling.module.code.ts"
import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"

export type TaskShape = {
  readonly kind: "task"
  readonly stampKey: string
  readonly dueKey: string
  readonly recurrenceKey: string
  readonly anchorKey: string
  readonly doneKey: string
}

type CollectionShape = {
  readonly kind: "collection"
  readonly lengthKey: string
  readonly progressKey: string
  readonly doneKey: string
}

export type CompletionShape = TaskShape | CollectionShape

export const COLLECTION_SHAPE: CollectionShape = {
  kind: "collection",
  lengthKey: "ownLength",
  progressKey: "ownProgress",
  doneKey: "completedAt",
}

const COMPLETION_SHAPES: Readonly<Record<string, CompletionShape>> = {
  "to-do": {
    kind: "task",
    stampKey: "toDoLastCompletedAt",
    dueKey: "toDoDueDate",
    recurrenceKey: "toDoRecurrence",
    anchorKey: "toDoAnchoredFromCompletion",
    doneKey: "toDoCompletedAt",
  },
  "temper-task": {
    kind: "task",
    stampKey: "lastCompletedAt",
    dueKey: "dueDate",
    recurrenceKey: "rruleRule",
    anchorKey: "rruleAnchorFromCompletion",
    doneKey: "completedAt",
  },
  collection: COLLECTION_SHAPE,
}

export function completionShapeAlong(chain: readonly string[]): CompletionShape | null {
  for (const pageTypeSlug of chain) {
    const declared = COMPLETION_SHAPES[pageTypeSlug]
    if (declared !== undefined) return declared
  }
  return null
}

type TaskValues = Readonly<Record<string, unknown>>

export function anchorFor(shape: TaskShape, values: TaskValues, atMs: number): string | null {
  const held = values[shape.anchorKey]
  if (held === true || held === "true") return getEsoDayStr(new Date(atMs))
  return textAt(values, shape.dueKey)
}

export function completedOnTheDayOf(shape: TaskShape, values: TaskValues, atMs: number): boolean {
  const last = textAt(values, shape.stampKey)
  if (last === null) return false
  const was = Date.parse(last)
  if (!Number.isFinite(was)) return false
  return getEsoDayStr(new Date(was)) === getEsoDayStr(new Date(atMs))
}

export function nextDueFor(
  shape: TaskShape,
  values: TaskValues,
  rule: string,
  atMs: number,
  nowMs: number = atMs
): string | null {
  try {
    const next = advanceRecurrenceDueDate(
      { rrule: rule, dueDate: anchorFor(shape, values, atMs), dueTime: null },
      new Date(nowMs),
      getEsoResetTime
    )
    return next === null ? null : next.dueDate
  } catch {
    return null
  }
}

export function taskCompletionValues(
  shape: TaskShape,
  values: TaskValues,
  atMs: number,
  nowMs: number = atMs
): Readonly<Record<string, string>> {
  const stamp = new Date(atMs).toISOString()
  const rule = textAt(values, shape.recurrenceKey)
  if (rule === null) return { [shape.stampKey]: stamp, [shape.doneKey]: stamp }
  if (completedOnTheDayOf(shape, values, atMs)) return { [shape.stampKey]: stamp }
  const due = nextDueFor(shape, values, rule, atMs, nowMs)
  if (due === null) return { [shape.stampKey]: stamp }
  return { [shape.stampKey]: stamp, [shape.dueKey]: due }
}

function collectionCompletionValues(
  shape: CollectionShape,
  values: TaskValues,
  atMs: number
): Readonly<Record<string, string | number>> {
  const stamp = new Date(atMs).toISOString()
  const length = asNumber(values[shape.lengthKey])
  if (length === null) return { [shape.doneKey]: stamp }
  return { [shape.doneKey]: stamp, [shape.progressKey]: length }
}

export function completionValues(
  shape: CompletionShape,
  values: TaskValues,
  atMs: number,
  nowMs: number = atMs
): Readonly<Record<string, string | number>> {
  if (shape.kind === "collection") return collectionCompletionValues(shape, values, atMs)
  return taskCompletionValues(shape, values, atMs, nowMs)
}

export function uncompletionValues(
  shape: CompletionShape
): Readonly<Record<string, null | number>> {
  if (shape.kind === "collection") return { [shape.doneKey]: null, [shape.progressKey]: 0 }
  return { [shape.stampKey]: null, [shape.doneKey]: null }
}

export function readsAsDone(shape: CompletionShape, values: TaskValues): boolean {
  if (shape.kind === "task") return textAt(values, shape.doneKey) !== null
  const length = asNumber(values[shape.lengthKey])
  if (length === null) return textAt(values, shape.doneKey) !== null
  return (asNumber(values[shape.progressKey]) ?? 0) >= length
}
