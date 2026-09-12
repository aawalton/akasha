import { expect, test } from "bun:test"
import { fetchedSaid } from "akasha/alan/harness/mobile-cli/git-tree-hash/git-tree-hash.module.code.ts"
import {
  OPERATIONAL,
  partWay,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import { mobileCutStatus } from "akasha/commands/pages/mobile/cut/status/mobile-cut-status.command.code.ts"

const ARGV: readonly string[] = []

const FETCHED_CODE = fetchedSaid("/repos/code")

const FETCHED_SHELL = fetchedSaid("/repos/shell")

const NO_REF = new Error("origin/main names no commit here")

test("a run that fetched one repo and then threw names that fetch", async () => {
  const said = await mobileCutStatus(ARGV, throwingAfter([FETCHED_CODE], NO_REF))

  expect(said.report).toEqual([FETCHED_CODE])
  expect(said.refusals.at(-1)).toBe(partWay([FETCHED_CODE])[0])
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before it fetched anything names the fault alone", async () => {
  const said = await mobileCutStatus(ARGV, throwingAfter([], NO_REF))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("origin/main names no commit here")
  expect(said.refusals.at(-1)).not.toContain("stopped part way")
})

test("a run that fetched both repos names both of them in one sentence", async () => {
  const wrote = [FETCHED_CODE, FETCHED_SHELL]
  const said = await mobileCutStatus(ARGV, throwingAfter(wrote, NO_REF))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toContain(`${FETCHED_CODE}; ${FETCHED_SHELL}`)
})
