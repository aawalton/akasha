import { getEsoDayStr, getEsoResetTime } from "@akasha/day/eso-day"
import { advanceRecurrenceDueDate } from "@akasha/recurrence/scheduling"

export type CompletionShape = {
  readonly stampKey: string
  readonly dueKey: string
  readonly recurrenceKey: string
  readonly anchorKey: string
  readonly doneKey: string | null
}

export const COMPLETION_SHAPES: Readonly<Record<string, CompletionShape>> = {
  "to-do": {
    stampKey: "toDoLastCompletedAt",
    dueKey: "toDoDueDate",
    recurrenceKey: "toDoRecurrence",
    anchorKey: "toDoAnchoredFromCompletion",
    doneKey: "toDoCompletedAt",
  },
  "temper-task": {
    stampKey: "lastCompletedAt",
    dueKey: "dueDate",
    recurrenceKey: "rruleRule",
    anchorKey: "rruleAnchorFromCompletion",
    doneKey: null,
  },
}

export function completionShapeOf(pageTypeSlug: string): CompletionShape | null {
  return COMPLETION_SHAPES[pageTypeSlug] ?? null
}

export type TaskValues = Readonly<Record<string, unknown>>

function textAt(values: TaskValues, key: string): string | null {
  const held = values[key]
  return typeof held === "string" && held !== "" ? held : null
}

export function anchorFor(shape: CompletionShape, values: TaskValues, atMs: number): string | null {
  if (values[shape.anchorKey] === true) return getEsoDayStr(new Date(atMs))
  return textAt(values, shape.dueKey)
}

export function completedOnTheDayOf(
  shape: CompletionShape,
  values: TaskValues,
  atMs: number
): boolean {
  const last = textAt(values, shape.stampKey)
  if (last === null) return false
  const was = Date.parse(last)
  if (!Number.isFinite(was)) return false
  return getEsoDayStr(new Date(was)) === getEsoDayStr(new Date(atMs))
}

export function nextDueFor(
  shape: CompletionShape,
  values: TaskValues,
  rule: string,
  atMs: number
): string | null {
  try {
    const next = advanceRecurrenceDueDate(
      { rrule: rule, dueDate: anchorFor(shape, values, atMs), dueTime: null },
      new Date(atMs),
      getEsoResetTime
    )
    return next === null ? null : next.dueDate
  } catch {
    return null
  }
}

export function completionValues(
  shape: CompletionShape,
  values: TaskValues,
  atMs: number
): Readonly<Record<string, string>> {
  const stamp = new Date(atMs).toISOString()
  const rule = textAt(values, shape.recurrenceKey)
  if (rule === null) {
    if (shape.doneKey === null) return { [shape.stampKey]: stamp }
    return { [shape.stampKey]: stamp, [shape.doneKey]: stamp }
  }
  const due = nextDueFor(shape, values, rule, atMs)
  if (due === null) return { [shape.stampKey]: stamp }
  return { [shape.stampKey]: stamp, [shape.dueKey]: due }
}

export function uncompletionValues(shape: CompletionShape): Readonly<Record<string, null>> {
  if (shape.doneKey === null) return { [shape.stampKey]: null }
  return { [shape.doneKey]: null }
}

export function readsAsDone(shape: CompletionShape, values: TaskValues): boolean {
  if (shape.doneKey === null) return false
  return textAt(values, shape.doneKey) !== null
}
