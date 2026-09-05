import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import { unreadIn } from "../../modules/warranting/warranting.module.code.ts"
import {
  pageTypeListed,
  pathsOf,
  seatListed,
  warrantsSeeded,
} from "../../modules/warranting/warranting.module.test-fixtures.ts"
import { ROLE_TYPE, subagentRole } from "./subagent-role.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a0596c-0000-7000-8000-000000000001"

const AT = "seat-system/subagent/subagents/one-suba.subagent.ts"

const BODY = `export const oneSuba = { slug: "one-suba" }\n`

function subaged(root: string, path: string = AT): string {
  writing(root, path, BODY)
  return path
}

test("a subagent warrants the role page type", () => {
  const root = scratch.rootFor("akasha-subagent-role-")
  const held = pageTypeListed(root, "role", ["domain"])
  expect(pathsOf(subagentRole(root, subaged(root)))).toEqual([held])
})

test("only a subagent warrants the role page type this way", () => {
  const root = scratch.rootFor("akasha-subagent-role-")
  pageTypeListed(root, "role", ["domain"])
  const at = seatListed(root, "one", `slug: "one"`)
  expect(pathsOf(subagentRole(root, at))).toEqual([])
})

test("a subagent whose body cannot be loaded warrants nothing", () => {
  const root = scratch.rootFor("akasha-subagent-role-")
  pageTypeListed(root, "role", ["domain"])
  writing(root, AT, "this is no module {\n")
  expect(pathsOf(subagentRole(root, AT))).toEqual([])
})

test("a role page type that is listed nowhere is no warrant", () => {
  const root = scratch.rootFor("akasha-subagent-role-")
  pageTypeListed(root, "persona", ["domain"])
  expect(pathsOf(subagentRole(root, subaged(root)))).toEqual([])
})

test("a role page type whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-subagent-role-")
  const held = pageTypeListed(root, "role", ["domain"])
  const at = subaged(root)
  rmSync(join(root, held))
  expect(pathsOf(subagentRole(root, at))).toEqual([])
})

test("a warrant carries the body at the role page type, and why it is owed", () => {
  const root = scratch.rootFor("akasha-subagent-role-")
  const typed = pageTypeListed(root, "role", ["domain"])
  const held = subagentRole(root, subaged(root))[0]
  expect(held?.path).toBe(typed)
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(ROLE_TYPE)
})

test("a role page type not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-subagent-role-")
  warrantsSeeded(root, ["subagent-role"])
  const held = pageTypeListed(root, "role", ["domain"])
  const oid = writing(root, AT, BODY)
  recordRead(root, AGENT, { path: AT, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [AT])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(ROLE_TYPE)
  expect(said[0]).toContain(held)
})
