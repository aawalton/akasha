import { gradeProperty } from "akasha/page/grade-property/grade-property.page-type.ts"

export type Grade = (typeof gradeProperty.values)[number]

type GradeKey = { readonly digit: string; readonly grade: Grade }

export const GRADE_KEYS: readonly GradeKey[] = [
  { digit: "7", grade: "S-" },
  { digit: "8", grade: "S" },
  { digit: "9", grade: "S+" },
  { digit: "4", grade: "A-" },
  { digit: "5", grade: "A" },
  { digit: "6", grade: "A+" },
  { digit: "1", grade: "B-" },
  { digit: "2", grade: "B" },
  { digit: "3", grade: "B+" },
  { digit: "0", grade: "F" },
]

const DELETED: Grade = "F"

const DELETE_SAID = "Delete"

export function gradeSaid(grade: Grade): string {
  return grade === DELETED ? DELETE_SAID : grade
}

export function gradeColor(grade: Grade): string | null {
  return gradeProperty.optionColors.find((one) => one.value === grade)?.color ?? null
}

export type Queued = { readonly id: string; readonly slug: string }

type Done = { readonly one: Queued; readonly grade: Grade }

export type Review = {
  readonly base: number
  readonly rows: readonly Queued[]
  readonly total: number
  readonly at: number
  readonly done: readonly Done[]
}

type Place = "first" | "last" | "kept"

export type Asking = { readonly base: number; readonly limit: number; readonly place: Place }

export type Stepped = { readonly review: Review; readonly asking: Asking | null }

type Answer = {
  readonly base: number
  readonly rows: readonly Queued[]
  readonly total: number
}

export const LOOKAHEAD = 100

export const WINDOW = LOOKAHEAD * 2

const REFILL_BELOW = LOOKAHEAD + LOOKAHEAD / 2

export const OPENING: Review = { base: 0, rows: [], total: 0, at: 0, done: [] }

export function openingAsked(): Asking {
  return { base: 0, limit: WINDOW, place: "first" }
}

export function shownOf(review: Review): Queued | null {
  return review.rows[review.at] ?? null
}

export function aheadOf(review: Review): readonly Queued[] {
  const count = Math.min(LOOKAHEAD, review.rows.length - 1)
  const ahead: Queued[] = []
  for (let step = 1; step <= count; step += 1) {
    const one = review.rows[(review.at + step) % review.rows.length]
    if (one !== undefined) ahead.push(one)
  }
  return ahead
}

export function countsOf(review: Review): ReadonlyMap<Grade, number> {
  const counts = new Map<Grade, number>()
  for (const one of review.done) counts.set(one.grade, (counts.get(one.grade) ?? 0) + 1)
  return counts
}

function clamped(at: number, length: number): number {
  return length === 0 ? 0 : Math.max(0, Math.min(at, length - 1))
}

function toppedUp(review: Review): Asking | null {
  const left = review.rows.length - review.at - 1
  if (left >= REFILL_BELOW) return null
  if (review.base + review.rows.length >= review.total) return null
  return { base: review.base + review.at, limit: WINDOW, place: "kept" }
}

export function answered(
  review: Review,
  answer: Answer,
  place: Place,
  pending: ReadonlySet<string>
): Review {
  const rows = answer.rows.filter((one) => !pending.has(one.id))
  const total = Math.max(rows.length, answer.total - (answer.rows.length - rows.length))
  const shown = shownOf(review)
  const kept = shown === null ? -1 : rows.findIndex((one) => one.id === shown.id)
  const moved = review.at + review.base - answer.base
  const at = place === "first" ? 0 : place === "last" ? rows.length - 1 : kept >= 0 ? kept : moved
  return { ...review, base: answer.base, rows, total, at: clamped(at, rows.length) }
}

function onward(review: Review): Stepped {
  const past = review.base + review.rows.length
  if (past < review.total) {
    return { review, asking: { base: past, limit: WINDOW, place: "first" } }
  }
  if (review.base === 0) return { review: { ...review, at: 0 }, asking: null }
  return { review, asking: { base: 0, limit: WINDOW, place: "first" } }
}

export function graded(review: Review, grade: Grade): Stepped {
  const one = shownOf(review)
  if (one === null) return { review, asking: null }
  const rows = review.rows.filter((_, at) => at !== review.at)
  const after: Review = {
    ...review,
    rows,
    total: Math.max(0, review.total - 1),
    done: [...review.done, { one, grade }],
  }
  if (after.total === 0) return { review: { ...after, at: 0 }, asking: null }
  if (review.at < rows.length) return { review: after, asking: toppedUp(after) }
  return onward({ ...after, at: clamped(rows.length - 1, rows.length) })
}

export function skipped(review: Review): Stepped {
  if (review.rows.length === 0) return { review, asking: null }
  if (review.at + 1 < review.rows.length) {
    const after = { ...review, at: review.at + 1 }
    return { review: after, asking: toppedUp(after) }
  }
  return onward(review)
}

export function stepBack(review: Review): Stepped {
  if (review.rows.length === 0) return { review, asking: null }
  if (review.at > 0) return { review: { ...review, at: review.at - 1 }, asking: null }
  if (review.base > 0) {
    const base = Math.max(0, review.base - WINDOW)
    return { review, asking: { base, limit: review.base - base, place: "last" } }
  }
  if (review.rows.length >= review.total) {
    return { review: { ...review, at: review.rows.length - 1 }, asking: null }
  }
  const base = Math.max(0, review.total - WINDOW)
  return { review, asking: { base, limit: WINDOW, place: "last" } }
}

export function undone(review: Review): { readonly review: Review; readonly undid: Done | null } {
  const undid = review.done.at(-1)
  if (undid === undefined) return { review, undid: null }
  const at = clamped(review.at, review.rows.length + 1)
  const rows = [...review.rows.slice(0, at), undid.one, ...review.rows.slice(at)]
  return {
    review: { ...review, rows, at, total: review.total + 1, done: review.done.slice(0, -1) },
    undid,
  }
}

export function regraded(review: Review, undid: Done): Review {
  return { ...review, done: [...review.done, undid] }
}

export function dropped(review: Review, id: string): Review {
  const gone = review.rows.findIndex((one) => one.id === id)
  if (gone < 0) return review
  const rows = review.rows.filter((one) => one.id !== id)
  const at = gone < review.at ? review.at - 1 : review.at
  return { ...review, rows, total: Math.max(0, review.total - 1), at: clamped(at, rows.length) }
}

export function unwritten(review: Review, one: Queued): Review {
  const done = review.done.filter((held) => held.one.id !== one.id)
  if (done.length === review.done.length) return review
  const at = clamped(review.at, review.rows.length + 1)
  const rows = [...review.rows.slice(0, at), one, ...review.rows.slice(at)]
  return { ...review, rows, at, total: review.total + 1, done }
}
