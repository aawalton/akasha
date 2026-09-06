import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import { unreadIn } from "../../modules/warranting/warranting.module.code.ts"
import {
  domainListed,
  pageTypeListed,
  pathsOf,
  seatListed,
  warrantsSeeded,
} from "../../modules/warranting/warranting.module.test-fixtures.ts"
import { PERSONA_TYPE, seatPersona } from "./seat-persona.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000001"

const SUB_AT = "seat-system/subagent/subagents/one-suba.subagent.ts"

const STATED = `slug: "one"`

test("a seat stating no persona warrants the persona page type all the same", () => {
  const root = scratch.rootFor("akasha-seat-persona-")
  const held = pageTypeListed(root, "persona", ["domain"])
  const at = seatListed(root, "one", STATED)
  expect(pathsOf(seatPersona(root, at))).toEqual([held])
})

test("a subagent warrants no persona page type", () => {
  const root = scratch.rootFor("akasha-seat-persona-")
  pageTypeListed(root, "persona", ["domain"])
  writing(root, SUB_AT, `export const oneSuba = { slug: "one-suba" }\n`)
  expect(pathsOf(seatPersona(root, SUB_AT))).toEqual([])
})

test("only an agent warrants the persona page type", () => {
  const root = scratch.rootFor("akasha-seat-persona-")
  pageTypeListed(root, "persona", ["domain"])
  const held = domainListed(root, "akasha")
  expect(pathsOf(seatPersona(root, held.path))).toEqual([])
})

test("a seat whose body cannot be loaded warrants nothing", () => {
  const root = scratch.rootFor("akasha-seat-persona-")
  pageTypeListed(root, "persona", ["domain"])
  const at = "seat-system/seat/seats/one.seat.ts"
  writing(root, at, "this is no module {\n")
  expect(pathsOf(seatPersona(root, at))).toEqual([])
})

test("a persona page type that is listed nowhere is no warrant", () => {
  const root = scratch.rootFor("akasha-seat-persona-")
  pageTypeListed(root, "role", ["domain"])
  const at = seatListed(root, "one", STATED)
  expect(pathsOf(seatPersona(root, at))).toEqual([])
})

test("a persona page type whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-seat-persona-")
  const held = pageTypeListed(root, "persona", ["domain"])
  const at = seatListed(root, "one", STATED)
  rmSync(join(root, held))
  expect(pathsOf(seatPersona(root, at))).toEqual([])
})

test("a warrant carries the body at the persona page type, and why it is owed", () => {
  const root = scratch.rootFor("akasha-seat-persona-")
  const typed = pageTypeListed(root, "persona", ["domain"])
  const at = seatListed(root, "one", STATED)
  const held = seatPersona(root, at)[0]
  expect(held?.path).toBe(typed)
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(PERSONA_TYPE)
})

test("a persona page type not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-seat-persona-")
  warrantsSeeded(root, ["seat-persona"])
  const held = pageTypeListed(root, "persona", ["domain"])
  const at = seatListed(root, "one", STATED)
  const oid = writing(root, at, `export const one = { ${STATED} }\n`)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [at])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(PERSONA_TYPE)
  expect(said[0]).toContain(held)
})
