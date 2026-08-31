import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "../../../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { standing } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import {
  domainStanding,
  initiativeStanding,
  pathsOf,
  seatStanding,
} from "../../warrant-scratch/warrant-scratch.module.code.ts"
import { unreadIn } from "../../warranting/warranting.module.code.ts"
import { warrantsStanding } from "../../warranting/warranting.module.test-fixtures.ts"
import { initiativeAncestors, UNDER } from "./initiative-ancestors.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000009"

test("a seat warrants the initiative the one it states stands under", () => {
  const root = scratch.rootFor("akasha-initiative-ancestors-")
  const top = initiativeStanding(root, "one-work")
  initiativeStanding(root, "one-step", `parentSlug: "initiative/one-work"`)
  const at = seatStanding(root, "one", `assignmentSlug: "initiative/one-step"`)
  expect(pathsOf(initiativeAncestors(root, at))).toEqual([top.path])
})

test("the chain is walked to the top rather than one step", () => {
  const root = scratch.rootFor("akasha-initiative-ancestors-")
  const top = initiativeStanding(root, "one-work")
  const mid = initiativeStanding(root, "one-step", `parentSlug: "initiative/one-work"`)
  initiativeStanding(root, "one-move", `parentSlug: "initiative/one-step"`)
  const at = seatStanding(root, "one", `assignmentSlug: "initiative/one-move"`)
  expect(pathsOf(initiativeAncestors(root, at))).toEqual([mid.path, top.path])
})

test("the initiative the seat states is no ancestor of itself", () => {
  const root = scratch.rootFor("akasha-initiative-ancestors-")
  initiativeStanding(root, "one-work")
  const mid = initiativeStanding(root, "one-step", `parentSlug: "initiative/one-work"`)
  const at = seatStanding(root, "one", `assignmentSlug: "initiative/one-step"`)
  expect(pathsOf(initiativeAncestors(root, at))).not.toContain(mid.path)
})

test("a chain that turns back on itself is walked once", () => {
  const root = scratch.rootFor("akasha-initiative-ancestors-")
  const one = initiativeStanding(root, "one-work", `parentSlug: "initiative/two-work"`)
  const two = initiativeStanding(root, "two-work", `parentSlug: "initiative/one-work"`)
  const at = seatStanding(root, "alpha", `assignmentSlug: "initiative/one-work"`)
  expect(pathsOf(initiativeAncestors(root, at))).toEqual([two.path])
  expect(pathsOf(initiativeAncestors(root, at))).not.toContain(one.path)
})

test("a seat stating an initiative nothing stands above warrants none", () => {
  const root = scratch.rootFor("akasha-initiative-ancestors-")
  initiativeStanding(root, "one-work")
  const at = seatStanding(root, "one", `assignmentSlug: "initiative/one-work"`)
  expect(pathsOf(initiativeAncestors(root, at))).toEqual([])
})

test("a seat stating no initiative warrants none", () => {
  const root = scratch.rootFor("akasha-initiative-ancestors-")
  domainStanding(root, "akasha-system")
  initiativeStanding(root, "one-work")
  initiativeStanding(root, "one-step", `parentSlug: "initiative/one-work"`)
  const at = seatStanding(root, "one", `assignmentSlug: "domain/akasha-system"`)
  expect(pathsOf(initiativeAncestors(root, at))).toEqual([])
})

test("a seat stating nothing at all warrants none", () => {
  const root = scratch.rootFor("akasha-initiative-ancestors-")
  initiativeStanding(root, "one-work")
  const at = seatStanding(root, "one", `roleSlug: "definer"`)
  expect(pathsOf(initiativeAncestors(root, at))).toEqual([])
})

test("an initiative whose page cannot be found warrants none", () => {
  const root = scratch.rootFor("akasha-initiative-ancestors-")
  initiativeStanding(root, "one-work")
  const at = seatStanding(root, "one", `assignmentSlug: "initiative/ghost"`)
  expect(pathsOf(initiativeAncestors(root, at))).toEqual([])
})

test("a parent no initiative stands for warrants none", () => {
  const root = scratch.rootFor("akasha-initiative-ancestors-")
  initiativeStanding(root, "one-step", `parentSlug: "initiative/ghost"`)
  const at = seatStanding(root, "one", `assignmentSlug: "initiative/one-step"`)
  expect(pathsOf(initiativeAncestors(root, at))).toEqual([])
})

test("only a seat warrants the initiatives above what it states", () => {
  const root = scratch.rootFor("akasha-initiative-ancestors-")
  initiativeStanding(root, "one-work")
  const mid = initiativeStanding(root, "one-step", `parentSlug: "initiative/one-work"`)
  expect(pathsOf(initiativeAncestors(root, mid.path))).toEqual([])
})

test("a warrant carries the body standing above, and why it is owed", () => {
  const root = scratch.rootFor("akasha-initiative-ancestors-")
  const top = initiativeStanding(root, "one-work")
  initiativeStanding(root, "one-step", `parentSlug: "initiative/one-work"`)
  const at = seatStanding(root, "one", `assignmentSlug: "initiative/one-step"`)
  const held = initiativeAncestors(root, at)[0]
  expect(held?.path).toBe(top.path)
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(UNDER)
})

test("an initiative above whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-initiative-ancestors-")
  const top = initiativeStanding(root, "one-work")
  initiativeStanding(root, "one-step", `parentSlug: "initiative/one-work"`)
  const at = seatStanding(root, "one", `assignmentSlug: "initiative/one-step"`)
  rmSync(join(root, top.path))
  expect(pathsOf(initiativeAncestors(root, at))).toEqual([])
})

test("an initiative above not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-initiative-ancestors-")
  warrantsStanding(root, ["initiative-ancestors"])
  const top = initiativeStanding(root, "one-work")
  initiativeStanding(root, "one-step", `parentSlug: "initiative/one-work"`)
  const at = seatStanding(root, "one", `assignmentSlug: "initiative/one-step"`)
  const oid = standing(root, at, `export const one = { assignmentSlug: "initiative/one-step" }\n`)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [at])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(UNDER)
  expect(said[0]).toContain(top.path)
})
