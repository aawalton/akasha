import { afterAll, expect, test } from "bun:test"
import {
  nestedAt,
  runChange,
  underModules,
} from "akasha/changes/agent/folder/nest-modules/nest-modules.change-agent.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { repoWorld } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import { scratch } from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

function worldIn(): World {
  return repoWorld()
}

test("a folder under no `modules` folder is carried under one beside where it sat", () => {
  expect(nestedAt("akasha/one/answering")).toBe("akasha/one/modules/answering")
})

test("a folder directly under the root is carried under a `modules` folder there", () => {
  expect(nestedAt("one")).toBe("modules/one")
})

test("a folder under a `modules` folder is already under one", () => {
  expect(underModules("akasha/one/modules/answering")).toBe(true)
})

test("a folder beneath a folder under a `modules` folder is under one too", () => {
  expect(underModules("akasha/one/modules/answering/deep")).toBe(true)
})

test("a folder under a `.server` folder is under one too", () => {
  expect(underModules("akasha/one/.server/answering")).toBe(true)
})

test("a folder named `module` is no `modules` folder", () => {
  expect(underModules("akasha/one/module/answering")).toBe(false)
})

test("a count that is no whole number above nothing is refused", async () => {
  const said = await runChange(worldIn(), { "at-most": "0" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("count of pages")
})

test("a count that is no whole number is refused", async () => {
  const said = await runChange(worldIn(), { "at-most": "some" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("count of pages")
})
