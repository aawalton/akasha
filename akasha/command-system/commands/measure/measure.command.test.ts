import { afterAll, expect, test } from "bun:test"
import { said as git } from "@akasha/git/git-running"
import { put } from "@akasha/testing-system/putting"
import type { Given } from "../../calling/calling.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
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

test("one call measures one subject", async () => {
  const said = await measure(["claude-accounts", "repo"], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("one subject")
})

test("the subject read is the first word", async () => {
  const said = await measure(["--claude-accounts"], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--claude-accounts`")
})

test("`repo` counts the checkout and what has arrived in akasha", async () => {
  const root = scratch.rootFor("measure-repo-")
  git(root, ["init", "--quiet"])
  put(root, ".git/info/exclude", "node_modules/\n")
  put(root, "akasha/one.ts", "one\n")
  put(root, "tools/two.ts", "two\n")
  put(root, "node_modules/pkg/three.ts", "three\n")

  const said = await measure(["repo"], given(root))

  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report).toEqual(["akasha      1", "repo        2", "share  50.00%"])
})

test("a checkout holding no akasha folder is refused rather than measured at none", async () => {
  const root = scratch.rootFor("measure-repo-bare-")
  put(root, "tools/one.ts", "one\n")

  const said = await measure(["repo"], given(root))

  expect(said.code).toBe(2)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("no akasha folder")
})
