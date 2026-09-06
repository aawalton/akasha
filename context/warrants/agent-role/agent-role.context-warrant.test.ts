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
import { agentRole, ROLE_TYPE } from "./agent-role.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000001"

const SUB_AT = "seat-system/subagent/subagents/one-suba.subagent.ts"

const SUB_BODY = `export const oneSuba = { slug: "one-suba" }\n`

const STATED = `slug: "one"`

test("a seat warrants the role page type", () => {
  const root = scratch.rootFor("akasha-agent-role-")
  const held = pageTypeListed(root, "role", ["domain"])
  const at = seatListed(root, "one", STATED)
  expect(pathsOf(agentRole(root, at))).toEqual([held])
})

test("a subagent stating no role of its own warrants the role page type all the same", () => {
  const root = scratch.rootFor("akasha-agent-role-")
  const held = pageTypeListed(root, "role", ["domain"])
  writing(root, SUB_AT, SUB_BODY)
  expect(pathsOf(agentRole(root, SUB_AT))).toEqual([held])
})

test("only an agent warrants the role page type", () => {
  const root = scratch.rootFor("akasha-agent-role-")
  pageTypeListed(root, "role", ["domain"])
  const held = domainListed(root, "akasha")
  expect(pathsOf(agentRole(root, held.path))).toEqual([])
})

test("an agent whose body cannot be loaded warrants nothing", () => {
  const root = scratch.rootFor("akasha-agent-role-")
  pageTypeListed(root, "role", ["domain"])
  writing(root, SUB_AT, "this is no module {\n")
  expect(pathsOf(agentRole(root, SUB_AT))).toEqual([])
})

test("a role page type that is listed nowhere is no warrant", () => {
  const root = scratch.rootFor("akasha-agent-role-")
  pageTypeListed(root, "persona", ["domain"])
  const at = seatListed(root, "one", STATED)
  expect(pathsOf(agentRole(root, at))).toEqual([])
})

test("a role page type whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-agent-role-")
  const held = pageTypeListed(root, "role", ["domain"])
  const at = seatListed(root, "one", STATED)
  rmSync(join(root, held))
  expect(pathsOf(agentRole(root, at))).toEqual([])
})

test("a warrant carries the body at the role page type, and why it is owed", () => {
  const root = scratch.rootFor("akasha-agent-role-")
  const typed = pageTypeListed(root, "role", ["domain"])
  const at = seatListed(root, "one", STATED)
  const held = agentRole(root, at)[0]
  expect(held?.path).toBe(typed)
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(ROLE_TYPE)
})

test("a role page type not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-agent-role-")
  warrantsSeeded(root, ["agent-role"])
  const held = pageTypeListed(root, "role", ["domain"])
  const oid = writing(root, SUB_AT, SUB_BODY)
  recordRead(root, AGENT, { path: SUB_AT, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [SUB_AT])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(ROLE_TYPE)
  expect(said[0]).toContain(held)
})
