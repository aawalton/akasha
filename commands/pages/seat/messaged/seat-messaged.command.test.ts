import { expect, test } from "bun:test"
import { noSeat, personaIn, type Seated } from "./seat-messaged.command.code.ts"

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
