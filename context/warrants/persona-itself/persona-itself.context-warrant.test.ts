import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import { unreadIn } from "../../warranting/warranting.module.code.ts"
import {
  pathsOf,
  personaListed,
  seatListed,
  warrantsSeeded,
} from "../../warranting/warranting.module.test-fixtures.ts"
import { PERSONA, personaItself } from "./persona-itself.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000001"

test("a seat warrants the persona it states", () => {
  const root = scratch.rootFor("akasha-persona-itself-")
  const held = personaListed(root, "akasha")
  const at = seatListed(root, "one", `personaSlug: "akasha"`)
  expect(pathsOf(personaItself(root, at))).toEqual([held.path])
})

test("a persona is named by its slug where the seat states it under a page type", () => {
  const root = scratch.rootFor("akasha-persona-itself-")
  const held = personaListed(root, "akasha")
  const at = seatListed(root, "one", `personaSlug: "persona/akasha"`)
  expect(pathsOf(personaItself(root, at))).toEqual([held.path])
})

test("a seat stating no persona warrants none", () => {
  const root = scratch.rootFor("akasha-persona-itself-")
  personaListed(root, "akasha")
  const at = seatListed(root, "one", `roleSlug: "definer"`)
  expect(pathsOf(personaItself(root, at))).toEqual([])
})

test("a persona whose page cannot be found is no warrant", () => {
  const root = scratch.rootFor("akasha-persona-itself-")
  personaListed(root, "akasha")
  const at = seatListed(root, "one", `personaSlug: "ghost"`)
  expect(pathsOf(personaItself(root, at))).toEqual([])
})

test("only a seat warrants a persona", () => {
  const root = scratch.rootFor("akasha-persona-itself-")
  const held = personaListed(root, "akasha")
  expect(pathsOf(personaItself(root, held.path))).toEqual([])
})

test("a seat whose body cannot be loaded warrants nothing", () => {
  const root = scratch.rootFor("akasha-persona-itself-")
  personaListed(root, "akasha")
  const path = "akasha/seat-system/seat/seats/one.seat.ts"
  writing(root, path, "this is no module {\n")
  expect(pathsOf(personaItself(root, path))).toEqual([])
})

test("a warrant carries the body standing at the persona, and why it is owed", () => {
  const root = scratch.rootFor("akasha-persona-itself-")
  const personaPage = personaListed(root, "akasha")
  const at = seatListed(root, "one", `personaSlug: "akasha"`)
  const held = personaItself(root, at)[0]
  expect(held?.path).toBe(personaPage.path)
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(PERSONA)
})

test("a persona whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-persona-itself-")
  const held = personaListed(root, "akasha")
  const at = seatListed(root, "one", `personaSlug: "akasha"`)
  rmSync(join(root, held.path))
  expect(pathsOf(personaItself(root, at))).toEqual([])
})

test("a persona not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-persona-itself-")
  warrantsSeeded(root, ["persona-itself"])
  const held = personaListed(root, "akasha")
  const at = seatListed(root, "one", `personaSlug: "akasha"`)
  const oid = writing(root, at, `export const one = { personaSlug: "akasha" }\n`)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [at])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(PERSONA)
  expect(said[0]).toContain(held.path)
})
