import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "../../../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { standing } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import {
  domainStanding,
  namesPart,
  pathsOf,
  seatStanding,
} from "../../warrant-scratch/warrant-scratch.module.code.ts"
import { unreadIn } from "../../warranting/warranting.module.code.ts"
import { warrantsStanding } from "../../warranting/warranting.module.test-fixtures.ts"
import { ABOVE, domainAncestors } from "./domain-ancestors.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000006"

test("a seat warrants the domain the one it states is a part of", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const top = domainStanding(root, "akasha-system")
  const mid = domainStanding(root, "context-system")
  namesPart(root, top, mid)
  const at = seatStanding(root, "one", `assignmentSlug: "domain/context-system"`)
  expect(pathsOf(domainAncestors(root, at))).toEqual([top.path])
})

test("the chain is walked to the top rather than one step", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const top = domainStanding(root, "akasha-system")
  const mid = domainStanding(root, "context-system")
  const low = domainStanding(root, "warranting")
  namesPart(root, top, mid)
  namesPart(root, mid, low)
  const at = seatStanding(root, "one", `assignmentSlug: "domain/warranting"`)
  expect(pathsOf(domainAncestors(root, at))).toEqual([top.path, mid.path])
})

test("the domain the seat states is no ancestor of itself", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const top = domainStanding(root, "akasha-system")
  const mid = domainStanding(root, "context-system")
  namesPart(root, top, mid)
  const at = seatStanding(root, "one", `assignmentSlug: "domain/context-system"`)
  expect(pathsOf(domainAncestors(root, at))).not.toContain(mid.path)
})

test("a seat stating a domain nothing stands above warrants none", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  domainStanding(root, "akasha-system")
  const at = seatStanding(root, "one", `assignmentSlug: "domain/akasha-system"`)
  expect(pathsOf(domainAncestors(root, at))).toEqual([])
})

test("a chain that turns back on itself is walked once", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const one = domainStanding(root, "one")
  const two = domainStanding(root, "two")
  namesPart(root, one, two)
  namesPart(root, two, one)
  const at = seatStanding(root, "alpha", `assignmentSlug: "domain/one"`)
  expect(pathsOf(domainAncestors(root, at))).toEqual([two.path])
})

test("a seat stating no domain warrants none", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const top = domainStanding(root, "akasha-system")
  const mid = domainStanding(root, "context-system")
  namesPart(root, top, mid)
  const at = seatStanding(root, "one", `roleSlug: "definer"`)
  expect(pathsOf(domainAncestors(root, at))).toEqual([])
})

test("only a seat warrants the domains above what it states", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const top = domainStanding(root, "akasha-system")
  const mid = domainStanding(root, "context-system")
  namesPart(root, top, mid)
  expect(pathsOf(domainAncestors(root, mid.path))).toEqual([])
})

test("a warrant carries the body standing above, and why it is owed", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const top = domainStanding(root, "akasha-system")
  const mid = domainStanding(root, "context-system")
  namesPart(root, top, mid)
  const at = seatStanding(root, "one", `assignmentSlug: "domain/context-system"`)
  const held = domainAncestors(root, at)[0]
  expect(held?.path).toBe(top.path)
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(ABOVE)
})

test("a domain above whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  const top = domainStanding(root, "akasha-system")
  const mid = domainStanding(root, "context-system")
  namesPart(root, top, mid)
  const at = seatStanding(root, "one", `assignmentSlug: "domain/context-system"`)
  rmSync(join(root, top.path))
  expect(pathsOf(domainAncestors(root, at))).toEqual([])
})

test("a domain above not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-domain-ancestors-")
  warrantsStanding(root, ["domain-ancestors"])
  const top = domainStanding(root, "akasha-system")
  const mid = domainStanding(root, "context-system")
  namesPart(root, top, mid)
  const at = seatStanding(root, "one", `assignmentSlug: "domain/context-system"`)
  const oid = standing(root, at, `export const one = { assignmentSlug: "domain/context-system" }\n`)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [at])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(ABOVE)
  expect(said[0]).toContain(top.path)
})
