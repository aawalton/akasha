import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import { recordRead } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import {
  pageTypeListed,
  pathsOf,
  personaListed,
  seatListed,
} from "../../warrant-scratch/warrant-scratch.module.code.ts"
import { knowingIn, unreadIn, type Warrant } from "../../warranting/warranting.module.code.ts"
import { warrantsSeeded } from "../../warranting/warranting.module.test-fixtures.ts"
import { PERSONA_TYPE, personaPageType } from "./persona-page-type.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000004"

function typeWorld(root: string): readonly string[] {
  const page = pageTypeListed(root, "page", null)
  const persona = pageTypeListed(root, "persona", "page")
  return [persona, page]
}

function warrantsAt(root: string, path: string): readonly Warrant[] {
  return personaPageType(root, path, knowingIn(root))
}

test("a seat warrants the type of the persona it states, and every type that one extends", () => {
  const root = scratch.rootFor("akasha-persona-page-type-")
  const chain = typeWorld(root)
  personaListed(root, "akasha")
  const at = seatListed(root, "one", `personaSlug: "akasha"`)
  expect(pathsOf(warrantsAt(root, at))).toEqual(chain)
})

test("a warrant says the seat is what owes the type", () => {
  const root = scratch.rootFor("akasha-persona-page-type-")
  typeWorld(root)
  personaListed(root, "akasha")
  const at = seatListed(root, "one", `personaSlug: "akasha"`)
  expect(warrantsAt(root, at)[0]?.owed).toBe(PERSONA_TYPE)
})

test("a seat stating no persona warrants no type", () => {
  const root = scratch.rootFor("akasha-persona-page-type-")
  typeWorld(root)
  personaListed(root, "akasha")
  const at = seatListed(root, "one", `roleSlug: "definer"`)
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a persona whose page cannot be found warrants no type", () => {
  const root = scratch.rootFor("akasha-persona-page-type-")
  typeWorld(root)
  personaListed(root, "akasha")
  const at = seatListed(root, "one", `personaSlug: "ghost"`)
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("only a seat warrants the type of a persona", () => {
  const root = scratch.rootFor("akasha-persona-page-type-")
  typeWorld(root)
  const at = personaListed(root, "akasha").path
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a type whose page is not there warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-persona-page-type-")
  const chain = typeWorld(root)
  personaListed(root, "akasha")
  const at = seatListed(root, "one", `personaSlug: "akasha"`)
  rmSync(join(root, chain[0] ?? ""))
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a type not read is refused, and the refusal says the seat owes it", () => {
  const root = scratch.rootFor("akasha-persona-page-type-")
  warrantsSeeded(root, ["persona-page-type"])
  const chain = typeWorld(root)
  personaListed(root, "akasha")
  const at = seatListed(root, "one", `personaSlug: "akasha"`)
  const oid = writing(root, at, `export const one = { personaSlug: "akasha" }\n`)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [at])
  expect(said.length).toBe(chain.length)
  expect(said[0]).toContain(PERSONA_TYPE)
})
