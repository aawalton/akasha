import { expect, test } from "bun:test"
import {
  type Keeping,
  marking,
  noSeat,
  personaIn,
  type Seated,
} from "akasha/commands/pages/seat/messaged/seat-messaged.command.code.ts"
import type { Persona } from "akasha/personas/reading/persona-reading.module.code.ts"

const SEATS: readonly Seated[] = [
  { slug: "amy", persona: "amy" },
  { slug: "ops", persona: "sophia" },
  { slug: "spare", persona: "" },
]

test("a seat answers the persona that seat states", () => {
  expect(personaIn(SEATS, "amy")).toBe("amy")
  expect(personaIn(SEATS, "ops")).toBe("sophia")
})

test("a name that is no seat answers nobody", () => {
  expect(personaIn(SEATS, "nobody")).toBe(null)
  expect(personaIn([], "amy")).toBe(null)
})

test("a seat naming no persona answers nobody", () => {
  expect(personaIn(SEATS, "spare")).toBe(null)
})

test("the refusal names the seat that was asked for", () => {
  expect(noSeat("spare")).toContain("`spare`")
})

const AT = new Date("2026-09-12T18:00:00.000Z")

const AMY = { id: "01a0", slug: "amy", path: "nowhere/amy.page.ts" } as Persona

function keeping(stops: keyof Keeping | null, day: number | null): Keeping {
  const halting = (which: keyof Keeping): undefined => {
    if (which === stops) throw new Error(`the lock on ${which} was held`)
    return undefined
  }
  return {
    mark: () => halting("mark"),
    raise: () => {
      halting("raise")
      return day === null ? null : [{ persona: "amy", sent: day }]
    },
    points: () => halting("points"),
  }
}

test("a run that kept every mark names each one", () => {
  const done: string[] = []
  const said = marking("/root", "amy", AMY, AT, done, keeping(null, 100))
  expect(said.refusals).toEqual([])
  expect(done).toEqual([
    "marked amy as written to at 2026-09-12T18:00:00.000Z",
    "raised amy's count on today's day",
    "kept amy's points for today",
  ])
})

test("a run stopped on the count names the mark it kept before it stopped", () => {
  const done: string[] = []
  expect(() => marking("/root", "amy", AMY, AT, done, keeping("raise", 100))).toThrow(
    "the lock on raise was held"
  )
  expect(done).toEqual(["marked amy as written to at 2026-09-12T18:00:00.000Z"])
})

test("a run stopped on the points names the mark and the count", () => {
  const done: string[] = []
  expect(() => marking("/root", "amy", AMY, AT, done, keeping("points", 100))).toThrow(
    "the lock on points was held"
  )
  expect(done).toEqual([
    "marked amy as written to at 2026-09-12T18:00:00.000Z",
    "raised amy's count on today's day",
  ])
})

test("a run stopped on the mark itself names nothing as kept", () => {
  const done: string[] = []
  expect(() => marking("/root", "amy", AMY, AT, done, keeping("mark", 100))).toThrow(
    "the lock on mark was held"
  )
  expect(done).toEqual([])
})

test("a day with no page filed under it raises no count and keeps no point", () => {
  const done: string[] = []
  const said = marking("/root", "amy", AMY, AT, done, keeping(null, null))
  expect(said.report[1]).toContain("no day page")
  expect(done).toEqual(["marked amy as written to at 2026-09-12T18:00:00.000Z"])
})
