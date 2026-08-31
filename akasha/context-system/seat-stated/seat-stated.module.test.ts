import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { standing } from "../../command-system/scratching/scratching.module.test-fixtures.ts"
import { seatStanding } from "../warrant-scratch/warrant-scratch.module.code.ts"
import { slugStated } from "./seat-stated.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("a seat states the slug it carries under the key it is asked for", () => {
  const root = scratch.rootFor("akasha-seat-stated-")
  const at = seatStanding(root, "one", `personaSlug: "akasha", roleSlug: "definer"`)
  expect(slugStated(root, at, "personaSlug")).toBe("akasha")
  expect(slugStated(root, at, "roleSlug")).toBe("definer")
})

test("a slug stated under a page type is answered by its last part alone", () => {
  const root = scratch.rootFor("akasha-seat-stated-")
  const at = seatStanding(root, "one", `assignmentSlug: "domain/akasha-system"`)
  expect(slugStated(root, at, "assignmentSlug")).toBe("akasha-system")
})

test("a key the seat does not state answers nothing", () => {
  const root = scratch.rootFor("akasha-seat-stated-")
  const at = seatStanding(root, "one", `personaSlug: "akasha"`)
  expect(slugStated(root, at, "roleSlug")).toBe(null)
})

test("a key stated as anything but text answers nothing", () => {
  const root = scratch.rootFor("akasha-seat-stated-")
  const at = seatStanding(root, "one", `onCall: true`)
  expect(slugStated(root, at, "onCall")).toBe(null)
})

test("a key stated empty answers nothing", () => {
  const root = scratch.rootFor("akasha-seat-stated-")
  const at = seatStanding(root, "one", `personaSlug: ""`)
  expect(slugStated(root, at, "personaSlug")).toBe(null)
})

test("a path that is no seat page states nothing", () => {
  const root = scratch.rootFor("akasha-seat-stated-")
  const path = "akasha/persona-system/persona/akasha/akasha.persona.ts"
  standing(root, path, `export const akasha = { personaSlug: "akasha" }\n`)
  expect(slugStated(root, path, "personaSlug")).toBe(null)
})

test("a seat whose body cannot be loaded states nothing", () => {
  const root = scratch.rootFor("akasha-seat-stated-")
  const path = "akasha/seat-system/seat/seats/one.seat.ts"
  standing(root, path, "this is no module {\n")
  expect(slugStated(root, path, "personaSlug")).toBe(null)
})

test("a seat standing nowhere states nothing", () => {
  const root = scratch.rootFor("akasha-seat-stated-")
  expect(slugStated(root, "akasha/seat-system/seat/seats/gone.seat.ts", "personaSlug")).toBe(null)
})

test("a seat whose exported value is not named for its slug states nothing", () => {
  const root = scratch.rootFor("akasha-seat-stated-")
  const path = "akasha/seat-system/seat/seats/one.seat.ts"
  standing(root, path, `export const other = { personaSlug: "akasha" }\n`)
  expect(slugStated(root, path, "personaSlug")).toBe(null)
})
