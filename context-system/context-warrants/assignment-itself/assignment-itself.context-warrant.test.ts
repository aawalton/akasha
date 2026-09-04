import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import {
  domainListed,
  initiativeListed,
  pathsOf,
  seatListed,
  typedListed,
} from "../../warrant-scratch/warrant-scratch.module.code.ts"
import { unreadIn } from "../../warranting/warranting.module.code.ts"
import { warrantsSeeded } from "../../warranting/warranting.module.test-fixtures.ts"
import { ASSIGNMENT, assignmentItself, WITHIN } from "./assignment-itself.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000003"

test("a seat warrants the assignment it states", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  const held = domainListed(root, "akasha-system")
  const at = seatListed(root, "one", `assignmentSlug: "domain/akasha-system"`)
  expect(pathsOf(assignmentItself(root, at))).toEqual([held.path])
})

test("an assignment stated under another page type is looked up under that type", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  const held = typedListed(root, "workspace-package", "checks-system")
  const at = seatListed(root, "one", `assignmentSlug: "workspace-package/checks-system"`)
  expect(pathsOf(assignmentItself(root, at))).toEqual([held.path])
})

test("a domain stated by a bare slug is warranted too", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  const held = domainListed(root, "akasha-system")
  const at = seatListed(root, "one", `assignmentSlug: "akasha-system"`)
  expect(pathsOf(assignmentItself(root, at))).toEqual([held.path])
})

test("a seat stating no assignment warrants none", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  domainListed(root, "akasha-system")
  const at = seatListed(root, "one", `roleSlug: "definer"`)
  expect(pathsOf(assignmentItself(root, at))).toEqual([])
})

test("an assignment whose page cannot be found is no warrant", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  domainListed(root, "akasha-system")
  const at = seatListed(root, "one", `assignmentSlug: "domain/ghost"`)
  expect(pathsOf(assignmentItself(root, at))).toEqual([])
})

test("an initiative whose page cannot be found is no warrant", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  domainListed(root, "akasha-system")
  const at = seatListed(root, "one", `assignmentSlug: "initiative/ghost"`)
  expect(pathsOf(assignmentItself(root, at))).toEqual([])
})

test("only a seat warrants an assignment of what it states", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  const held = domainListed(root, "akasha-system")
  expect(pathsOf(assignmentItself(root, held.path))).toEqual([])
})

test("a warrant carries the body standing at the assignment, and why it is owed", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  const said = domainListed(root, "akasha-system")
  const at = seatListed(root, "one", `assignmentSlug: "domain/akasha-system"`)
  const held = assignmentItself(root, at)[0]
  expect(held?.path).toBe(said.path)
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(ASSIGNMENT)
})

test("an assignment whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  const held = domainListed(root, "akasha-system")
  const at = seatListed(root, "one", `assignmentSlug: "domain/akasha-system"`)
  rmSync(join(root, held.path))
  expect(pathsOf(assignmentItself(root, at))).toEqual([])
})

test("a seat stating an initiative warrants the domain that initiative names", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  const domain = domainListed(root, "domain-system")
  const work = initiativeListed(root, "one-work", `domainSlug: "domain/domain-system"`)
  const at = seatListed(root, "one", `assignmentSlug: "initiative/one-work"`)
  expect(pathsOf(assignmentItself(root, at))).toEqual([work.path, domain.path])
})

test("an initiative naming its domain under another page type warrants that page", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  const domain = typedListed(root, "workspace-package", "domain-system")
  const work = initiativeListed(root, "one-work", `domainSlug: "workspace-package/domain-system"`)
  const at = seatListed(root, "one", `assignmentSlug: "initiative/one-work"`)
  expect(pathsOf(assignmentItself(root, at))).toEqual([work.path, domain.path])
})

test("the domain an initiative names says why it is owed", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  const domain = domainListed(root, "domain-system")
  initiativeListed(root, "one-work", `domainSlug: "domain/domain-system"`)
  const at = seatListed(root, "one", `assignmentSlug: "initiative/one-work"`)
  const held = assignmentItself(root, at)[1]
  expect(held?.path).toBe(domain.path)
  expect(held?.owed).toBe(WITHIN)
})

test("an initiative naming a domain that cannot be found warrants the initiative alone", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  const work = initiativeListed(root, "one-work", `domainSlug: "domain/ghost"`)
  const at = seatListed(root, "one", `assignmentSlug: "initiative/one-work"`)
  expect(pathsOf(assignmentItself(root, at))).toEqual([work.path])
})

test("an initiative naming no domain warrants itself alone", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  domainListed(root, "domain-system")
  const work = initiativeListed(root, "one-work")
  const at = seatListed(root, "one", `assignmentSlug: "initiative/one-work"`)
  expect(pathsOf(assignmentItself(root, at))).toEqual([work.path])
})

test("an assignment not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-assignment-itself-")
  warrantsSeeded(root, ["assignment-itself"])
  const held = domainListed(root, "akasha-system")
  const at = seatListed(root, "one", `assignmentSlug: "domain/akasha-system"`)
  const oid = writing(root, at, `export const one = { assignmentSlug: "domain/akasha-system" }\n`)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [at])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(ASSIGNMENT)
  expect(said[0]).toContain(held.path)
})
