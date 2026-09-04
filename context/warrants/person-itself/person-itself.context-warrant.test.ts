import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import { unreadIn } from "../../warranting/warranting.module.code.ts"
import {
  pathsOf,
  personListed,
  seatListed,
  warrantsSeeded,
} from "../../warranting/warranting.module.test-fixtures.ts"
import { PERSON, personItself } from "./person-itself.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000001"

test("a seat warrants the person it states", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  const held = personListed(root, "alan")
  const at = seatListed(root, "one", `personSlug: "alan"`)
  expect(pathsOf(personItself(root, at))).toEqual([held.path])
})

test("a person is named by its slug where the seat states it under a page type", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  const held = personListed(root, "alan")
  const at = seatListed(root, "one", `personSlug: "person/alan"`)
  expect(pathsOf(personItself(root, at))).toEqual([held.path])
})

test("a seat stating no person warrants none", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  personListed(root, "alan")
  const at = seatListed(root, "one", `personaSlug: "akasha"`)
  expect(pathsOf(personItself(root, at))).toEqual([])
})

test("a person whose page cannot be found is no warrant", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  personListed(root, "alan")
  const at = seatListed(root, "one", `personSlug: "ghost"`)
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
  const path = "akasha/seat-system/seat/seats/one.seat.ts"
  writing(root, path, "this is no module {\n")
  expect(pathsOf(personItself(root, path))).toEqual([])
})

test("a warrant carries the body standing at the person, and why it is owed", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  const personPage = personListed(root, "alan")
  const at = seatListed(root, "one", `personSlug: "alan"`)
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
  const at = seatListed(root, "one", `personSlug: "alan"`)
  rmSync(join(root, held.path))
  expect(pathsOf(personItself(root, at))).toEqual([])
})

test("a person not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-person-itself-")
  warrantsSeeded(root, ["person-itself"])
  const held = personListed(root, "alan")
  const at = seatListed(root, "one", `personSlug: "alan"`)
  const oid = writing(root, at, `export const one = { personSlug: "alan" }\n`)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [at])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(PERSON)
  expect(said[0]).toContain(held.path)
})
