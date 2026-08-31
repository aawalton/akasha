import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import { recordRead } from "../../../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { standing } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import {
  pageTypeStanding,
  pathsOf,
  roleStanding,
  seatStanding,
} from "../../warrant-scratch/warrant-scratch.module.code.ts"
import { knowingIn, unreadIn, type Warrant } from "../../warranting/warranting.module.code.ts"
import { warrantsStanding } from "../../warranting/warranting.module.test-fixtures.ts"
import { ROLE_TYPE, rolePageType } from "./role-page-type.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000005"

function typeWorld(root: string): readonly string[] {
  const page = pageTypeStanding(root, "page", null)
  const role = pageTypeStanding(root, "role", "page")
  return [role, page]
}

function warrantsAt(root: string, path: string): readonly Warrant[] {
  return rolePageType(root, path, knowingIn(root))
}

test("a seat warrants the type of the role it states, and every type that one extends", () => {
  const root = scratch.rootFor("akasha-role-page-type-")
  const chain = typeWorld(root)
  roleStanding(root, "definer")
  const at = seatStanding(root, "one", `roleSlug: "definer"`)
  expect(pathsOf(warrantsAt(root, at))).toEqual(chain)
})

test("a warrant says the seat is what owes the type", () => {
  const root = scratch.rootFor("akasha-role-page-type-")
  typeWorld(root)
  roleStanding(root, "definer")
  const at = seatStanding(root, "one", `roleSlug: "definer"`)
  expect(warrantsAt(root, at)[0]?.owed).toBe(ROLE_TYPE)
})

test("a seat stating no role warrants no type", () => {
  const root = scratch.rootFor("akasha-role-page-type-")
  typeWorld(root)
  roleStanding(root, "definer")
  const at = seatStanding(root, "one", `personaSlug: "akasha"`)
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a role whose page cannot be found warrants no type", () => {
  const root = scratch.rootFor("akasha-role-page-type-")
  typeWorld(root)
  roleStanding(root, "definer")
  const at = seatStanding(root, "one", `roleSlug: "ghost"`)
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("only a seat warrants the type of a role", () => {
  const root = scratch.rootFor("akasha-role-page-type-")
  typeWorld(root)
  const at = roleStanding(root, "definer").path
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a type whose page is not there warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-role-page-type-")
  const chain = typeWorld(root)
  roleStanding(root, "definer")
  const at = seatStanding(root, "one", `roleSlug: "definer"`)
  rmSync(join(root, chain[0] ?? ""))
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a type not read is refused, and the refusal says the seat owes it", () => {
  const root = scratch.rootFor("akasha-role-page-type-")
  warrantsStanding(root, ["role-page-type"])
  const chain = typeWorld(root)
  roleStanding(root, "definer")
  const at = seatStanding(root, "one", `roleSlug: "definer"`)
  const oid = standing(root, at, `export const one = { roleSlug: "definer" }\n`)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [at])
  expect(said.length).toBe(chain.length)
  expect(said[0]).toContain(ROLE_TYPE)
})
