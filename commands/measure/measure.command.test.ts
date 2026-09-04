import { afterAll, expect, test } from "bun:test"
import { said as git } from "@akasha/git/git-running"
import { put } from "@akasha/testing-system/putting"
import type { Given } from "../../command-system/calling/calling.module.code.ts"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { measure } from "./measure.command.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function given(root: string): Given {
  return { root, calledAs: "akasha measure", from: root, writer: null, agentId: null }
}

test("a call naming no subject is refused, saying the ones it takes", async () => {
  const said = await measure([], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("claude-accounts")
  expect(said.refusals[0]).toContain("repo")
})

test("a subject this does not measure is refused by name", async () => {
  const said = await measure(["seats"], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`seats`")
})

test("an act this does not take is refused by name", async () => {
  const said = await measure(["claude-accounts", "repo"], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`repo`")
  expect(said.refusals[0]).toContain("no act this takes")
})

test("a subject carrying no act is refused the word after it", async () => {
  const said = await measure(["repo", "cost"], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("carries no act")
})

test("one call names one act", async () => {
  const said = await measure(["claude-accounts", "cost", "cost"], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("one act")
})

test("the subject read is the first word", async () => {
  const said = await measure(["--claude-accounts"], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--claude-accounts`")
})

test("`repo` counts the files the checkout holds", async () => {
  const root = scratch.rootFor("measure-repo-")
  git(root, ["init", "--quiet"])
  put(root, ".git/info/exclude", "node_modules/\n")
  put(root, "akasha/one.ts", "one\n")
  put(root, "tools/two.ts", "two\n")
  put(root, "node_modules/pkg/three.ts", "three\n")

  const said = await measure(["repo"], given(root))

  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report).toEqual([
    "type   files  lines",
    "ts         2      2",
    "",
    "total      2      2",
  ])
})

test("a checkout git cannot list throws rather than counting none", () => {
  const root = scratch.rootFor("measure-repo-bare-")

  expect(() => measure(["repo"], given(root))).toThrow()
})

test("`pages` in a checkout holding no index throws rather than counting none", () => {
  const root = scratch.rootFor("measure-pages-")
  git(root, ["init", "--quiet"])
  put(root, "one.page-type.ts", "one\n")

  expect(() => measure(["pages"], given(root))).toThrow()
})
