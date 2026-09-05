import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import { unreadIn } from "../../modules/warranting/warranting.module.code.ts"
import {
  domainListed,
  pathsOf,
  seatListed,
  warrantsSeeded,
} from "../../modules/warranting/warranting.module.test-fixtures.ts"
import { AKASHA, seatAkasha } from "./seat-akasha.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000001"

const SUB_AT = "seat-system/subagent/subagents/one-suba.subagent.ts"

const STATED = `slug: "one"`

test("a seat warrants the akasha domain", () => {
  const root = scratch.rootFor("akasha-seat-akasha-")
  const held = domainListed(root, "akasha")
  const at = seatListed(root, "one", STATED)
  expect(pathsOf(seatAkasha(root, at))).toEqual([held.path])
})

test("a subagent warrants the akasha domain", () => {
  const root = scratch.rootFor("akasha-seat-akasha-")
  const held = domainListed(root, "akasha")
  writing(root, SUB_AT, `export const oneSuba = { slug: "one-suba" }\n`)
  expect(pathsOf(seatAkasha(root, SUB_AT))).toEqual([held.path])
})

test("only an agent warrants the akasha domain", () => {
  const root = scratch.rootFor("akasha-seat-akasha-")
  const held = domainListed(root, "akasha")
  expect(pathsOf(seatAkasha(root, held.path))).toEqual([])
})

test("an agent whose body cannot be loaded warrants nothing", () => {
  const root = scratch.rootFor("akasha-seat-akasha-")
  domainListed(root, "akasha")
  const at = "seat-system/seat/seats/one.seat.ts"
  writing(root, at, "this is no module {\n")
  expect(pathsOf(seatAkasha(root, at))).toEqual([])
})

test("an akasha domain that is listed nowhere is no warrant", () => {
  const root = scratch.rootFor("akasha-seat-akasha-")
  domainListed(root, "other")
  const at = seatListed(root, "one", STATED)
  expect(pathsOf(seatAkasha(root, at))).toEqual([])
})

test("an akasha domain whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-seat-akasha-")
  const held = domainListed(root, "akasha")
  const at = seatListed(root, "one", STATED)
  rmSync(join(root, held.path))
  expect(pathsOf(seatAkasha(root, at))).toEqual([])
})

test("a warrant carries the body at the akasha domain, and why it is owed", () => {
  const root = scratch.rootFor("akasha-seat-akasha-")
  const domain = domainListed(root, "akasha")
  const at = seatListed(root, "one", STATED)
  const held = seatAkasha(root, at)[0]
  expect(held?.path).toBe(domain.path)
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(AKASHA)
})

test("an akasha domain not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-seat-akasha-")
  warrantsSeeded(root, ["seat-akasha"])
  const held = domainListed(root, "akasha")
  const at = seatListed(root, "one", STATED)
  const oid = writing(root, at, `export const one = { ${STATED} }\n`)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [at])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(AKASHA)
  expect(said[0]).toContain(held.path)
})
