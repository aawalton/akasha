import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { owedIn } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import {
  pathsOf,
  personListed,
  seatListed,
  warrantsSeeded,
} from "akasha/domain/context/modules/warranting/warranting.module.test-fixtures.ts"
import {
  PERSON,
  personItself,
} from "akasha/domain/context/warrant/person-itself/person-itself.context-warrant.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/system/modules/scratching/scratching.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000001"

test("a seat warrants the person it states", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  const held = personListed(root, "alan")
  const at = seatListed(root, "one", `persons: ["alan"]`)
  expect(pathsOf(personItself(root, at))).toEqual([held.path])
})

test("a seat stating several persons warrants none of them", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  personListed(root, "alan")
  personListed(root, "jenny")
  const stated = `persons: ["person/alan", "person/jenny"], assignmentSlug: "domain/couples-therapy"`
  const at = seatListed(root, "one", stated)
  expect(pathsOf(personItself(root, at))).toEqual([])
})

test("a seat assigned a written story warrants no person", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  personListed(root, "alan")
  const stated = `persons: ["person/alan"], role: "role/writer", assignmentSlug: "story-written/fairweather"`
  const at = seatListed(root, "one", stated)
  expect(pathsOf(personItself(root, at))).toEqual([])
})

test("a seat assigned a played story warrants no person", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  personListed(root, "alan")
  const stated = `persons: ["person/alan"], role: "role/game-master", assignmentSlug: "story-played/overwhere-i"`
  const at = seatListed(root, "one", stated)
  expect(pathsOf(personItself(root, at))).toEqual([])
})

test("a handler seat warrants the person it states", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  const held = personListed(root, "alan")
  const stated = `persons: ["person/alan"], role: "role/handler", assignmentSlug: "domain/alan"`
  const at = seatListed(root, "one", stated)
  expect(pathsOf(personItself(root, at))).toEqual([held.path])
})

test("a persona seat warrants the person it states", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  const held = personListed(root, "alan")
  const stated = `persons: ["person/alan"], role: "role/definer", assignmentSlug: "domain/akasha"`
  const at = seatListed(root, "one", stated)
  expect(pathsOf(personItself(root, at))).toEqual([held.path])
})

test("a person is named by its slug where the seat states it under a page type", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  const held = personListed(root, "alan")
  const at = seatListed(root, "one", `persons: ["person/alan"]`)
  expect(pathsOf(personItself(root, at))).toEqual([held.path])
})

test("a seat stating no person warrants none", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  personListed(root, "alan")
  const at = seatListed(root, "one", `persona: "akasha"`)
  expect(pathsOf(personItself(root, at))).toEqual([])
})

test("a person whose page cannot be found is no warrant", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  personListed(root, "alan")
  const at = seatListed(root, "one", `persons: ["ghost"]`)
  expect(pathsOf(personItself(root, at))).toEqual([])
})

test("only a seat warrants a person", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  const held = personListed(root, "alan")
  expect(pathsOf(personItself(root, held.path))).toEqual([])
})

test("a seat whose body cannot be loaded warrants nothing", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  personListed(root, "alan")
  const path = "akasha/seat-system/seat/seat/one.seat.ts"
  writing(root, path, "this is no module {\n")
  expect(pathsOf(personItself(root, path))).toEqual([])
})

test("a warrant carries the body at the person, and why it is owed", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  const personPage = personListed(root, "alan")
  const at = seatListed(root, "one", `persons: ["alan"]`)
  const held = personItself(root, at)[0]
  expect(held?.path).toBe(personPage.path)
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(PERSON)
})

test("a person whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  const held = personListed(root, "alan")
  const at = seatListed(root, "one", `persons: ["alan"]`)
  rmSync(join(root, held.path))
  expect(pathsOf(personItself(root, at))).toEqual([])
})

test("a person not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  warrantsSeeded(root, ["person-itself"])
  const held = personListed(root, "alan")
  const at = seatListed(root, "one", `persons: ["alan"]`)
  const oid = writing(root, at, `export const one = { persons: ["alan"] }\n`)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, carriedOid: null })
  const said = owedIn(root, AGENT, [at])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(PERSON)
  expect(said[0]).toContain(held.path)
})
