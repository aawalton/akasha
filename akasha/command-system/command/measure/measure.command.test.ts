import { afterAll, expect, test } from "bun:test"
import { put } from "../../../testing-system/putting/putting.module.code.ts"
import type { Given } from "../../calling/calling.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
import { measure } from "./measure.command.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function given(root: string): Given {
  return { root, calledAs: "akasha measure", from: root, writer: null, agentId: null }
}

test("a call naming no subject is refused, saying the ones it takes", () => {
  const said = measure([], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("claude-accounts")
  expect(said.refusals[0]).toContain("repo")
})

test("a subject this does not measure is refused by name", () => {
  const said = measure(["seats"], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`seats`")
})

test("one call measures one subject", () => {
  const said = measure(["claude-accounts", "repo"], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("one subject")
})

test("the subject read is the first word", () => {
  const said = measure(["--claude-accounts"], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--claude-accounts`")
})

test("`repo` counts the checkout and what has arrived in akasha", () => {
  const root = scratch.rootFor("measure-repo-")
  put(root, "akasha/one.ts", "one\n")
  put(root, "tools/two.ts", "two\n")
  put(root, "node_modules/pkg/three.ts", "three\n")

  const said = measure(["repo"], given(root))

  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report).toEqual(["akasha      1", "repo        2", "share  50.00%"])
})

test("a checkout holding no akasha folder is refused rather than measured at none", () => {
  const root = scratch.rootFor("measure-repo-bare-")
  put(root, "tools/one.ts", "one\n")

  const said = measure(["repo"], given(root))

  expect(said.code).toBe(2)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("no akasha folder")
})
