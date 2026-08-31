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
import { ABOVE, domainAncestors } from "./domain-ancestors.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000006"

type Standing = {
  readonly path: string
  readonly id: string
}

function domain(root: string, slug: string): Standing {
  const id = mintedId(slug)
  const path = `akasha/${slug}/${slug}.domain.ts`
  const held = { path, id }
  standing(root, path, `export const held = { id: "${id}", slug: "${slug}" }\n`)
  indexed(root, `path/${path}.jsonl`, JSON.stringify(held))
  indexed(root, `identity/page/id/${id}.jsonl`, JSON.stringify(held))
  indexed(root, `identity/domain/slug/${slug}.jsonl`, JSON.stringify(held))
  return held
}

function names(root: string, whole: Standing, part: Standing): undefined {
  indexed(
    root,
    `relation/page/id/${part.id}/part-slugs/${whole.id}.jsonl`,
    JSON.stringify({ path: whole.path })
  )
}

function seat(root: string, slug: string, stated: string): string {
  const path = `akasha/seat-system/seat/seats/${slug}.seat.ts`
  standing(root, path, `export const ${slug} = { ${stated} }\n`)
  return path
}

test("a seat warrants the domain the one it states is a part of", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const top = domain(root, "akasha-system")
  const mid = domain(root, "context-system")
  names(root, top, mid)
  const at = seat(root, "one", `assignmentSlug: "domain/context-system"`)
  expect(pathsOf(domainAncestors(root, at))).toEqual([top.path])
})

test("the chain is walked to the top rather than one step", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const top = domain(root, "akasha-system")
  const mid = domain(root, "context-system")
  const low = domain(root, "warranting")
  names(root, top, mid)
  names(root, mid, low)
  const at = seat(root, "one", `assignmentSlug: "domain/warranting"`)
  expect(pathsOf(domainAncestors(root, at))).toEqual([top.path, mid.path])
})

test("the domain the seat states is no ancestor of itself", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const top = domain(root, "akasha-system")
  const mid = domain(root, "context-system")
  names(root, top, mid)
  const at = seat(root, "one", `assignmentSlug: "domain/context-system"`)
  expect(pathsOf(domainAncestors(root, at))).not.toContain(mid.path)
})

test("a seat stating a domain nothing stands above warrants none", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  domain(root, "akasha-system")
  const at = seat(root, "one", `assignmentSlug: "domain/akasha-system"`)
  expect(pathsOf(domainAncestors(root, at))).toEqual([])
})

test("a chain that turns back on itself is walked once", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const one = domain(root, "one")
  const two = domain(root, "two")
  names(root, one, two)
  names(root, two, one)
  const at = seat(root, "alpha", `assignmentSlug: "domain/one"`)
  expect(pathsOf(domainAncestors(root, at))).toEqual([two.path])
})

test("a seat stating no domain warrants none", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const top = domain(root, "akasha-system")
  const mid = domain(root, "context-system")
  names(root, top, mid)
  const at = seat(root, "one", `roleSlug: "definer"`)
  expect(pathsOf(domainAncestors(root, at))).toEqual([])
})

test("only a seat warrants the domains above what it states", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const top = domain(root, "akasha-system")
  const mid = domain(root, "context-system")
  names(root, top, mid)
  expect(pathsOf(domainAncestors(root, mid.path))).toEqual([])
})

test("a warrant carries the body standing above, and why it is owed", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const top = domain(root, "akasha-system")
  const mid = domain(root, "context-system")
  names(root, top, mid)
  const at = seat(root, "one", `assignmentSlug: "domain/context-system"`)
  const held = domainAncestors(root, at)[0]
  expect(held?.path).toBe(top.path)
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(ABOVE)
})

test("a domain above whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const top = domain(root, "akasha-system")
  const mid = domain(root, "context-system")
  names(root, top, mid)
  const at = seat(root, "one", `assignmentSlug: "domain/context-system"`)
  rmSync(join(root, top.path))
  expect(pathsOf(domainAncestors(root, at))).toEqual([])
})

test("a domain above not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  warrantsStanding(root, ["domain-ancestors"])
  const top = domain(root, "akasha-system")
  const mid = domain(root, "context-system")
  names(root, top, mid)
  const at = seat(root, "one", `assignmentSlug: "domain/context-system"`)
  const oid = standing(root, at, `export const one = { assignmentSlug: "domain/context-system" }\n`)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [at])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(ABOVE)
  expect(said[0]).toContain(top.path)
})
