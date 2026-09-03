import { describe, expect, test } from "bun:test"
import { type Row, rowOf } from "../exercise-rows/exercise-rows.module.code.ts"
import { closedAtFor, closingFor, closingsIn, leftOpen } from "./session-closing.module.code.ts"

const OPEN: readonly Row[] = [
  rowOf({
    id: "one",
    slug: "friday-pull-2026-06-19",
    title: "Friday pull",
    workoutSessionDate: "2026-06-19",
    workoutSessionStartedAt: "2026-06-19T15:02:00.000Z",
  }),
  rowOf({
    id: "two",
    slug: "monday-push-2026-06-22",
    title: "Monday push",
    workoutSessionDate: "2026-06-22",
    workoutSessionStartedAt: "2026-06-22T14:00:00.000Z",
  }),
  rowOf({
    id: "three",
    slug: "no-start-2026-06-20",
    title: "No start",
    workoutSessionDate: "2026-06-20",
  }),
]

describe("which instant closes an abandoned session", () => {
  test("the last set stands over the start where both are stated", () => {
    expect(
      closedAtFor({ lastSetAt: "2026-06-19T16:00:00.000Z", startedAt: "2026-06-19T15:00:00.000Z" })
    ).toBe("2026-06-19T16:00:00.000Z")
  })

  test("the start closes the session where no set states a time", () => {
    expect(closedAtFor({ lastSetAt: null, startedAt: "2026-06-19T15:00:00.000Z" })).toBe(
      "2026-06-19T15:00:00.000Z"
    )
  })

  test("a session stating neither is left open rather than closed at a guess", () => {
    expect(closedAtFor({ lastSetAt: null, startedAt: null })).toBeNull()
  })
})

describe("which open sessions were abandoned", () => {
  test("the fixture holds three open sessions, so an empty one cannot read clean", () => {
    expect(OPEN.length).toBe(3)
  })

  test("a session filed on today is still running rather than abandoned", () => {
    expect(leftOpen(OPEN, "2026-06-22").map((row) => row.slug)).toEqual([
      "friday-pull-2026-06-19",
      "no-start-2026-06-20",
    ])
  })

  test("a session filed after today is no more abandoned than today's", () => {
    expect(leftOpen(OPEN, "2026-06-19").length).toBe(0)
  })

  test("a session stating no start is left out of the closings rather than closed", () => {
    const closings = closingsIn(OPEN, "2026-06-22")
    expect(closings.map((one) => one.slug)).toEqual(["friday-pull-2026-06-19"])
  })

  test("a closing carries the session's identity, its day and the instant it closes at", () => {
    const [first] = OPEN
    expect(first).toBeDefined()
    expect(closingFor(first as Row)).toEqual({
      id: "one",
      slug: "friday-pull-2026-06-19",
      title: "Friday pull",
      date: "2026-06-19",
      completedAt: "2026-06-19T15:02:00.000Z",
    })
  })
})
