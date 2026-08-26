import { describe, expect, test } from "bun:test"
import {
  capacityFromSessions,
  dayAfter,
  type SessionAnswer,
  sessionsFromAnswer,
  wakeBoundary,
  wakeWindow,
} from "./session-readings.ts"

type Row = SessionAnswer["rows"][number]

const SIDECAR = "memory:daily-tracking/2026-08-18.sessions.jsonl"

function row(at: string | undefined, values: Readonly<Record<string, unknown>>): Row {
  const held = {
    title: null,
    "start-time": null,
    "end-time": null,
    "safety-level": null,
    "difficulty-level": null,
    "capacity-rate": null,
    ...values,
  }
  return at === undefined ? { values: held } : { at, values: held }
}

function whole(at: string | undefined, values: Readonly<Record<string, unknown>>): Row {
  return row(at, {
    title: "Projects",
    "start-time": "2026-08-18T13:00:00.000Z",
    "end-time": "2026-08-18T15:00:00.000Z",
    "safety-level": "3",
    "difficulty-level": "3",
    "capacity-rate": "0",
    ...values,
  })
}

function answerOf(rows: readonly Row[]): SessionAnswer {
  return { n: rows.length, rows }
}

const SLEPT = row(`${SIDECAR}#0`, {
  title: "Sleep",
  "start-time": "2026-08-18T04:00:00.000Z",
  "end-time": "2026-08-18T12:45:00.000Z",
  "capacity-rate": "1",
})

const WORKED = row(`${SIDECAR}#1`, {
  title: "Projects",
  "start-time": "2026-08-18T13:00:00.000Z",
  "end-time": "2026-08-18T15:00:00.000Z",
  "safety-level": "3",
  "difficulty-level": "3",
  "capacity-rate": "-0.5",
})

const DAY: readonly Row[] = [SLEPT, WORKED]

describe("sessionsFromAnswer — a short or mangled read refuses rather than answering", () => {
  test("an empty corpus is a broken read, not a life with nothing recorded in it", () => {
    expect(() => sessionsFromAnswer(answerOf([]))).toThrow(/no sessions at all/)
  })

  test("a count that outruns the rows refuses rather than measuring the window it was shown", () => {
    expect(() => sessionsFromAnswer({ n: 619, rows: DAY })).toThrow(/counted 619/)
  })

  test("a key not one session carries refuses, and names the key", () => {
    const stripped = DAY.map((held) => row(held.at, { ...held.values, title: null }))
    expect(() => sessionsFromAnswer(answerOf(stripped))).toThrow(/carries `title`/)
  })

  test("asking in the sibling reader's camelCase reads as a key nothing carries", () => {
    const camel = [row(`${SIDECAR}#0`, { title: "Sleep", startTime: "2026-08-18T04:00:00.000Z" })]
    expect(() => sessionsFromAnswer(answerOf(camel))).toThrow(/carries `start-time`/)
  })

  test("a session with no `at` refuses, because nothing states which day it was part of", () => {
    expect(() => sessionsFromAnswer(answerOf([whole(undefined, {})]))).toThrow(/no `at`/)
  })

  test("an `at` naming something other than a day's sidecar refuses", () => {
    const elsewhere = [whole("memory:daily-tracking/2026-08-18.md", {})]
    expect(() => sessionsFromAnswer(answerOf(elsewhere))).toThrow(/names no/)
  })

  test("a whole answer becomes sessions carrying the day their sidecar names", () => {
    const pages = sessionsFromAnswer(answerOf(DAY))
    expect(pages).toHaveLength(2)
    expect(pages[0]?.day).toBe("2026-08-18")
    expect(pages[0]?.capacityRate).toBe(1)
    expect(pages[1]?.capacityRate).toBe(-0.5)
  })
})

describe("capacity — the day's hours, each weighted by the rate it gave back at", () => {
  const pages = sessionsFromAnswer(answerOf(DAY))

  test("every session's length times its rate, summed", () => {
    expect(capacityFromSessions(pages, "2026-08-18")).toBeCloseTo(7.75, 10)
  })

  test("a day holding no session is null, because unrecorded and worth nothing differ", () => {
    expect(capacityFromSessions(pages, "2026-08-17")).toBeNull()
  })

  test("a session still running is measured up to now", () => {
    const open = sessionsFromAnswer(
      answerOf([
        whole(`${SIDECAR}#0`, { "capacity-rate": "2", "end-time": "2026-08-18T14:00:00.000Z" }),
        whole(`${SIDECAR}#1`, {
          title: "Pod",
          "start-time": "2026-08-18T14:00:00.000Z",
          "end-time": null,
          "capacity-rate": "1",
        }),
      ])
    )
    expect(
      capacityFromSessions(open, "2026-08-18", Date.parse("2026-08-18T17:00:00.000Z"))
    ).toBeCloseTo(5, 10)
  })
})

describe("the wake window — Alan's day runs from waking to waking", () => {
  test("six in the morning in his zone is the boundary nothing moved", () => {
    expect(new Date(wakeBoundary("2026-08-18")).toISOString()).toBe("2026-08-18T10:00:00.000Z")
  })

  test("the same wall-clock hour stands an hour later in UTC outside daylight saving", () => {
    expect(new Date(wakeBoundary("2026-01-18")).toISOString()).toBe("2026-01-18T11:00:00.000Z")
  })

  test("the day after crosses a month end", () => {
    expect(dayAfter("2026-08-31")).toBe("2026-09-01")
  })

  test("a Sleep block ending inside the plain span moves the boundary to where it ended", () => {
    const span = wakeWindow(sessionsFromAnswer(answerOf(DAY)), "2026-08-18")
    expect(new Date(span.from).toISOString()).toBe("2026-08-18T12:45:00.000Z")
    expect(new Date(span.to).toISOString()).toBe("2026-08-19T10:00:00.000Z")
  })

  test("an open Sleep block offers no wake instant, and the plain boundary stands", () => {
    const asleep = sessionsFromAnswer(
      answerOf([
        whole(`${SIDECAR}#0`, {
          title: "Sleep",
          "start-time": "2026-08-18T04:00:00.000Z",
          "end-time": null,
        }),
        whole(`${SIDECAR}#1`, {}),
      ])
    )
    expect(new Date(wakeWindow(asleep, "2026-08-18").from).toISOString()).toBe(
      "2026-08-18T10:00:00.000Z"
    )
  })

  test("a Sleep block ending outside the plain span leaves the boundary alone", () => {
    const late = sessionsFromAnswer(
      answerOf([
        whole(`${SIDECAR}#0`, {
          title: "Sleep",
          "start-time": "2026-08-18T04:00:00.000Z",
          "end-time": "2026-08-18T09:00:00.000Z",
        }),
        whole(`${SIDECAR}#1`, {}),
      ])
    )
    expect(new Date(wakeWindow(late, "2026-08-18").from).toISOString()).toBe(
      "2026-08-18T10:00:00.000Z"
    )
  })
})
