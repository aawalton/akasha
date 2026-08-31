import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import { recordRead } from "../../../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { standing } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import { mintedId } from "../../../testing-system/minting/minting.module.code.ts"
import { indexed, pathsOf } from "../../warrant-scratch/warrant-scratch.module.code.ts"
import { knowingIn, unreadIn, type Warrant } from "../../warranting/warranting.module.code.ts"
import { warrantsStanding } from "../../warranting/warranting.module.test-fixtures.ts"
import { PERSONA_TYPE, personaPageType } from "./persona-page-type.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000004"

function pageType(root: string, slug: string, above: string | null): string {
  const id = mintedId(`type-${slug}`)
  const path = `akasha/${slug}/${slug}.page-type.ts`
  const said = above === null ? "" : `, extendsSlug: "page-type/${above}"`
  standing(
    root,
    path,
    `export const held = { id: "${id}", pageTypeSlug: "page-type", slug: "${slug}"${said} }\n`
  )
  indexed(root, `identity/page-type/slug/${slug}.jsonl`, JSON.stringify({ path, id }))
  return path
}

function typeWorld(root: string): readonly string[] {
  const page = pageType(root, "page", null)
  const persona = pageType(root, "persona", "page")
  return [persona, page]
}

function persona(root: string, slug: string): string {
  const id = mintedId(slug)
  const path = `akasha/persona-system/persona/${slug}/${slug}.persona.ts`
  standing(root, path, `export const ${slug} = { id: "${id}", slug: "${slug}" }\n`)
  indexed(root, `identity/persona/slug/${slug}.jsonl`, JSON.stringify({ path, id }))
  return path
}

function seat(root: string, slug: string, stated: string): string {
  const path = `akasha/seat-system/seat/seats/${slug}.seat.ts`
  standing(root, path, `export const ${slug} = { ${stated} }\n`)
  return path
}

function warrantsAt(root: string, path: string): readonly Warrant[] {
  return personaPageType(root, path, knowingIn(root))
}

test("a seat warrants the type of the persona it states, and every type that one extends", () => {
  const root = scratch.rootFor("akasha-persona-page-type-")
  const chain = typeWorld(root)
  persona(root, "akasha")
  const at = seat(root, "one", `personaSlug: "akasha"`)
  expect(pathsOf(warrantsAt(root, at))).toEqual(chain)
})

test("a warrant says the seat is what owes the type", () => {
  const root = scratch.rootFor("akasha-persona-page-type-")
  typeWorld(root)
  persona(root, "akasha")
  const at = seat(root, "one", `personaSlug: "akasha"`)
  expect(warrantsAt(root, at)[0]?.owed).toBe(PERSONA_TYPE)
})

test("a seat stating no persona warrants no type", () => {
  const root = scratch.rootFor("akasha-persona-page-type-")
  typeWorld(root)
  persona(root, "akasha")
  const at = seat(root, "one", `roleSlug: "definer"`)
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a persona whose page cannot be found warrants no type", () => {
  const root = scratch.rootFor("akasha-persona-page-type-")
  typeWorld(root)
  persona(root, "akasha")
  const at = seat(root, "one", `personaSlug: "ghost"`)
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("only a seat warrants the type of a persona", () => {
  const root = scratch.rootFor("akasha-persona-page-type-")
  typeWorld(root)
  const at = persona(root, "akasha")
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a type whose page is not there warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-persona-page-type-")
  const chain = typeWorld(root)
  persona(root, "akasha")
  const at = seat(root, "one", `personaSlug: "akasha"`)
  rmSync(join(root, chain[0] ?? ""))
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a type not read is refused, and the refusal says the seat owes it", () => {
  const root = scratch.rootFor("akasha-persona-page-type-")
  warrantsStanding(root, ["persona-page-type"])
  const chain = typeWorld(root)
  persona(root, "akasha")
  const at = seat(root, "one", `personaSlug: "akasha"`)
  const oid = standing(root, at, `export const one = { personaSlug: "akasha" }\n`)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [at])
  expect(said.length).toBe(chain.length)
  expect(said[0]).toContain(PERSONA_TYPE)
})
