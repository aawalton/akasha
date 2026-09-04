import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import { seatListed } from "../../warranting/warranting.module.test-fixtures.ts"
import { slugStated, typeStated } from "./agent-stated.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("a seat states the slug it carries under the key it is asked for", () => {
  const root = scratch.rootFor("akasha-agent-stated-")
  const at = seatListed(root, "one", `personaSlug: "akasha", roleSlug: "definer"`)
  expect(slugStated(root, at, "personaSlug")).toBe("akasha")
  expect(slugStated(root, at, "roleSlug")).toBe("definer")
})

test("a slug stated under a page type is answered by its last part alone", () => {
  const root = scratch.rootFor("akasha-agent-stated-")
  const at = seatListed(root, "one", `assignmentSlug: "domain/akasha-system"`)
  expect(slugStated(root, at, "assignmentSlug")).toBe("akasha-system")
})

test("the page type a slug is stated under is answered on its own", () => {
  const root = scratch.rootFor("akasha-agent-stated-")
  const at = seatListed(root, "one", `assignmentSlug: "initiative/aine-initiative-work"`)
  expect(typeStated(root, at, "assignmentSlug")).toBe("initiative")
  expect(slugStated(root, at, "assignmentSlug")).toBe("aine-initiative-work")
})

test("a slug stated under no page type names none", () => {
  const root = scratch.rootFor("akasha-agent-stated-")
  const at = seatListed(root, "one", `assignmentSlug: "akasha-system"`)
  expect(typeStated(root, at, "assignmentSlug")).toBe(null)
})

test("a key the seat does not state names no page type", () => {
  const root = scratch.rootFor("akasha-agent-stated-")
  const at = seatListed(root, "one", `personaSlug: "akasha"`)
  expect(typeStated(root, at, "assignmentSlug")).toBe(null)
})

test("a key the seat does not state answers nothing", () => {
  const root = scratch.rootFor("akasha-agent-stated-")
  const at = seatListed(root, "one", `personaSlug: "akasha"`)
  expect(slugStated(root, at, "roleSlug")).toBe(null)
})

test("a key stated as anything but text answers nothing", () => {
  const root = scratch.rootFor("akasha-agent-stated-")
  const at = seatListed(root, "one", `onCall: true`)
  expect(slugStated(root, at, "onCall")).toBe(null)
})

test("a key stated empty answers nothing", () => {
  const root = scratch.rootFor("akasha-agent-stated-")
  const at = seatListed(root, "one", `personaSlug: ""`)
  expect(slugStated(root, at, "personaSlug")).toBe(null)
})

test("a path that is no agent's page states nothing", () => {
  const root = scratch.rootFor("akasha-agent-stated-")
  const path = "akasha/persona-system/personas/akasha/akasha.persona.ts"
  writing(root, path, `export const akasha = { personaSlug: "akasha" }\n`)
  expect(slugStated(root, path, "personaSlug")).toBe(null)
  expect(typeStated(root, path, "personaSlug")).toBe(null)
})

test("a subagent states the slug it carries under the key it is asked for", () => {
  const root = scratch.rootFor("akasha-agent-stated-")
  const path = "akasha/seat-system/subagent/subagents/one-abc.subagent.ts"
  writing(root, path, `export const oneAbc = { assignmentSlug: "domain/akasha-system" }\n`)
  expect(slugStated(root, path, "assignmentSlug")).toBe("akasha-system")
  expect(typeStated(root, path, "assignmentSlug")).toBe("domain")
})

test("a seat whose body cannot be loaded states nothing", () => {
  const root = scratch.rootFor("akasha-agent-stated-")
  const path = "akasha/seat-system/seat/seats/one.seat.ts"
  writing(root, path, "this is no module {\n")
  expect(slugStated(root, path, "personaSlug")).toBe(null)
})

test("a seat standing nowhere states nothing", () => {
  const root = scratch.rootFor("akasha-agent-stated-")
  expect(slugStated(root, "akasha/seat-system/seat/seats/gone.seat.ts", "personaSlug")).toBe(null)
})

test("a seat whose exported value is not named for its slug states nothing", () => {
  const root = scratch.rootFor("akasha-agent-stated-")
  const path = "akasha/seat-system/seat/seats/one.seat.ts"
  writing(root, path, `export const other = { personaSlug: "akasha" }\n`)
  expect(slugStated(root, path, "personaSlug")).toBe(null)
})
