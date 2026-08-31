import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "../../../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { standing } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import {
  domainStanding,
  pathsOf,
  seatStanding,
} from "../../warrant-scratch/warrant-scratch.module.code.ts"
import { unreadIn } from "../../warranting/warranting.module.code.ts"
import { warrantsStanding } from "../../warranting/warranting.module.test-fixtures.ts"
import { DOMAIN, domainItself } from "./domain-itself.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000003"

test("a seat warrants the domain it states", () => {
  const root = scratch.rootFor("akasha-domain-itself-")
  const held = domainStanding(root, "akasha-system")
  const at = seatStanding(root, "one", `assignmentSlug: "domain/akasha-system"`)
  expect(pathsOf(domainItself(root, at))).toEqual([held.path])
})

test("a domain stated by a bare slug is warranted too", () => {
  const root = scratch.rootFor("akasha-domain-itself-")
  const held = domainStanding(root, "akasha-system")
  const at = seatStanding(root, "one", `assignmentSlug: "akasha-system"`)
  expect(pathsOf(domainItself(root, at))).toEqual([held.path])
})

test("a seat stating no domain warrants none", () => {
  const root = scratch.rootFor("akasha-domain-itself-")
  domainStanding(root, "akasha-system")
  const at = seatStanding(root, "one", `roleSlug: "definer"`)
  expect(pathsOf(domainItself(root, at))).toEqual([])
})

test("a domain whose page cannot be found is no warrant", () => {
  const root = scratch.rootFor("akasha-domain-itself-")
  domainStanding(root, "akasha-system")
  const at = seatStanding(root, "one", `assignmentSlug: "domain/ghost"`)
  expect(pathsOf(domainItself(root, at))).toEqual([])
})

test("only a seat warrants a domain of what it states", () => {
  const root = scratch.rootFor("akasha-domain-itself-")
  const held = domainStanding(root, "akasha-system")
  expect(pathsOf(domainItself(root, held.path))).toEqual([])
})

test("a warrant carries the body standing at the domain, and why it is owed", () => {
  const root = scratch.rootFor("akasha-domain-itself-")
  const said = domainStanding(root, "akasha-system")
  const at = seatStanding(root, "one", `assignmentSlug: "domain/akasha-system"`)
  const held = domainItself(root, at)[0]
  expect(held?.path).toBe(said.path)
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(DOMAIN)
})

test("a domain whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-domain-itself-")
  const held = domainStanding(root, "akasha-system")
  const at = seatStanding(root, "one", `assignmentSlug: "domain/akasha-system"`)
  rmSync(join(root, held.path))
  expect(pathsOf(domainItself(root, at))).toEqual([])
})

test("a domain not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-domain-itself-")
  warrantsStanding(root, ["domain-itself"])
  const held = domainStanding(root, "akasha-system")
  const at = seatStanding(root, "one", `assignmentSlug: "domain/akasha-system"`)
  const oid = standing(root, at, `export const one = { assignmentSlug: "domain/akasha-system" }\n`)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [at])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(DOMAIN)
  expect(said[0]).toContain(held.path)
})
