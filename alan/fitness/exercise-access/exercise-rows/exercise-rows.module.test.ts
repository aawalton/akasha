import { describe, expect, test } from "bun:test"
import {
  boolIn,
  cutTo,
  numberIn,
  ordered,
  passes,
  type Row,
  rowOf,
  shapedIn,
  textIn,
  textsIn,
  titleOf,
} from "./exercise-rows.module.code.ts"

function rowFrom(held: Readonly<Record<string, unknown>>): Row {
  return rowOf(held)
}

const SESSIONS: readonly Row[] = [
  rowFrom({
    id: "019ee091-8984-7432-87cb-7f3418252e37",
    slug: "friday-pull-2026-06-19",
    title: "Friday pull",
    workoutSessionDate: "2026-06-19",
    workoutSessionCompletedAt: "2026-06-19T16:25:35.468Z",
  }),
  rowFrom({
    id: "019ee091-8984-7432-87cb-7f3418252e38",
    slug: "monday-push-2026-06-22",
    title: "Monday push",
    workoutSessionDate: "2026-06-22",
  }),
  rowFrom({
    id: "019ee091-8984-7432-87cb-7f3418252e39",
    slug: "wednesday-legs-2026-06-24",
    title: "Wednesday legs",
    workoutSessionDate: "2026-06-24",
    workoutSessionCompletedAt: "2026-06-24T18:00:00.000Z",
  }),
]

describe("what a row states", () => {
  test("a page's own fields stand on the row under the names the page file gives them", () => {
    const row = rowFrom({
      id: "019ee093-e069-754e-bacc-b646edcd0357",
      slug: "a-set",
      title: "Bent Over Two-Dumbbell Row set 1",
      exerciseSlug: "bent-over-two-dumbbell-row",
      isWarmup: false,
      reps: 10,
      rpe: 4.5,
      focusTags: ["push", "pull"],
    })
    expect(textIn(row, "exerciseSlug")).toBe("bent-over-two-dumbbell-row")
    expect(numberIn(row, "reps")).toBe(10)
    expect(numberIn(row, "rpe")).toBe(4.5)
    expect(boolIn(row, "isWarmup")).toBe(false)
    expect(textsIn(row, "focusTags")).toEqual(["push", "pull"])
    expect(titleOf(row)).toBe("Bent Over Two-Dumbbell Row set 1")
  })

  test("a number stays a number rather than becoming the text of one", () => {
    const row = rowFrom({ id: "one", reps: 10 })
    expect(textIn(row, "reps")).toBeUndefined()
    expect(numberIn(row, "reps")).toBe(10)
  })

  test("text that reads like a number is left as text, so a title of digits survives", () => {
    const row = rowFrom({ id: "one", title: "12", slug: "12" })
    expect(titleOf(row)).toBe("12")
    expect(row.slug).toBe("12")
  })

  test("a row missing a title falls back to its id rather than to nothing", () => {
    expect(titleOf(rowFrom({ id: "only-an-id" }))).toBe("only-an-id")
  })

  test("a field of a kind nothing asked for reads as absent rather than as itself", () => {
    const row = rowFrom({ id: "one", reps: 10 })
    expect(boolIn(row, "reps")).toBeUndefined()
    expect(textIn(row, "nothingStatedThis")).toBeUndefined()
    expect(textsIn(row, "reps")).toEqual([])
  })
})

describe("which rows an asking keeps", () => {
  test("the fixture holds three sessions, so an empty one cannot read clean", () => {
    expect(SESSIONS.length).toBe(3)
  })

  test("`empty` keeps the sessions no close is stated for", () => {
    const open = SESSIONS.filter((row) =>
      passes(row, { key: "workoutSessionCompletedAt", empty: true })
    )
    expect(open.map((row) => row.slug)).toEqual(["monday-push-2026-06-22"])
  })

  test("`eq` matches the value the page states rather than its text", () => {
    const row = rowFrom({ id: "one", isWarmup: false, reps: 10 })
    expect(passes(row, { key: "isWarmup", eq: false })).toBe(true)
    expect(passes(row, { key: "isWarmup", eq: true })).toBe(false)
    expect(passes(row, { key: "reps", eq: 10 })).toBe(true)
  })

  test("`contains` reads a title without minding its case", () => {
    const [first] = SESSIONS
    expect(first).toBeDefined()
    expect(passes(first as Row, { key: "title", contains: "PULL" })).toBe(true)
    expect(passes(first as Row, { key: "title", contains: "legs" })).toBe(false)
  })

  test("`in` keeps only the rows whose value is named", () => {
    const kept = SESSIONS.filter((row) =>
      passes(row, { key: "workoutSessionDate", in: ["2026-06-19", "2026-06-24"] })
    )
    expect(kept.length).toBe(2)
  })

  test("a descending order puts the latest day first", () => {
    const sorted = ordered(SESSIONS, [{ by: "workoutSessionDate", dir: "desc" }])
    expect(sorted.map((row) => row.workoutSessionDate)).toEqual([
      "2026-06-24",
      "2026-06-22",
      "2026-06-19",
    ])
  })

  test("a selection drops every field it does not name, keeping identity", () => {
    const [first] = SESSIONS
    expect(first).toBeDefined()
    const cut = cutTo(first as Row, ["id", "slug"])
    expect(cut.slug).toBe("friday-pull-2026-06-19")
    expect(cut.workoutSessionDate).toBeUndefined()
    expect(cut.title).toBeNull()
  })

  test("where narrows before order sorts and limit cuts", () => {
    const held = shapedIn(SESSIONS, {
      pageTypeSlug: "workout-session",
      where: [{ key: "workoutSessionDate", in: ["2026-06-19", "2026-06-24"] }],
      order: [{ by: "workoutSessionDate", dir: "desc" }],
      limit: 1,
    })
    expect(held.map((row) => row.workoutSessionDate)).toEqual(["2026-06-24"])
  })

  test("a limit past the end takes what stands rather than refusing", () => {
    const held = shapedIn(SESSIONS, { pageTypeSlug: "workout-session", limit: 99 })
    expect(held.length).toBe(3)
  })
})
