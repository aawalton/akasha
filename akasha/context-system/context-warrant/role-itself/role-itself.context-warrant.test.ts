import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "../../../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { standing } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import { mintedId } from "../../../testing-system/minting/minting.module.code.ts"
import { indexed, pathsOf } from "../../warrant-scratch/warrant-scratch.module.code.ts"
import { unreadIn } from "../../warranting/warranting.module.code.ts"
import { warrantsStanding } from "../../warranting/warranting.module.test-fixtures.ts"
import { ROLE, roleItself } from "./role-itself.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000002"

type Standing = {
  readonly path: string
  readonly id: string
}

function role(root: string, slug: string): Standing {
  const id = mintedId(slug)
  const path = `akasha/role-system/role/roles/${slug}.role.ts`
  const held = { path, id }
  standing(root, path, `export const ${slug} = { id: "${id}", slug: "${slug}" }\n`)
  indexed(root, `path/${path}.jsonl`, JSON.stringify(held))
  indexed(root, `identity/page/id/${id}.jsonl`, JSON.stringify(held))
  indexed(root, `identity/role/slug/${slug}.jsonl`, JSON.stringify(held))
  return held
}

function seat(root: string, slug: string, stated: string): string {
  const path = `akasha/seat-system/seat/seats/${slug}.seat.ts`
  standing(root, path, `export const ${slug} = { ${stated} }\n`)
  return path
}

test("a seat warrants the role it states", () => {
  const root = scratch.rootFor("akasha-role-itself-")
  const held = role(root, "definer")
  const at = seat(root, "one", `roleSlug: "definer"`)
  expect(pathsOf(roleItself(root, at))).toEqual([held.path])
})

test("a role is named by its slug where the seat states it under a page type", () => {
  const root = scratch.rootFor("akasha-role-itself-")
  const held = role(root, "definer")
  const at = seat(root, "one", `roleSlug: "role/definer"`)
  expect(pathsOf(roleItself(root, at))).toEqual([held.path])
})

test("a seat stating no role warrants none", () => {
  const root = scratch.rootFor("akasha-role-itself-")
  role(root, "definer")
  const at = seat(root, "one", `personaSlug: "akasha"`)
  expect(pathsOf(roleItself(root, at))).toEqual([])
})

test("a role whose page cannot be found is no warrant", () => {
  const root = scratch.rootFor("akasha-role-itself-")
  role(root, "definer")
  const at = seat(root, "one", `roleSlug: "ghost"`)
  expect(pathsOf(roleItself(root, at))).toEqual([])
})

test("only a seat warrants a role", () => {
  const root = scratch.rootFor("akasha-role-itself-")
  const held = role(root, "definer")
  expect(pathsOf(roleItself(root, held.path))).toEqual([])
})

test("a warrant carries the body standing at the role, and why it is owed", () => {
  const root = scratch.rootFor("akasha-role-itself-")
  const definer = role(root, "definer")
  const at = seat(root, "one", `roleSlug: "definer"`)
  const held = roleItself(root, at)[0]
  expect(held?.path).toBe(definer.path)
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(ROLE)
})

test("a role whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-role-itself-")
  const held = role(root, "definer")
  const at = seat(root, "one", `roleSlug: "definer"`)
  rmSync(join(root, held.path))
  expect(pathsOf(roleItself(root, at))).toEqual([])
})

test("a role not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-role-itself-")
  warrantsStanding(root, ["role-itself"])
  const held = role(root, "definer")
  const at = seat(root, "one", `roleSlug: "definer"`)
  const oid = standing(root, at, `export const one = { roleSlug: "definer" }\n`)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [at])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(ROLE)
  expect(said[0]).toContain(held.path)
})
