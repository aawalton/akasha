import { afterAll, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { createRequire } from "node:module"
import {
  CHECKING_IN,
  gateBuilt,
  INDEXING_IN,
  indexingLoaded,
  NO_GATE,
} from "akasha/command/modules/gate-building/gate-building.module.code.ts"
import { repoWith, scratch } from "akasha/command/modules/landing/landing.module.test-fixtures.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { indexTakenFrom } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"

afterAll(scratch.sweep)

const HERE = rootOf(import.meta.path)

test("the gate reaches the checks late, and a root carrying no check index will not build one", async () => {
  const root = repoWith({ "one.txt": "committed" })
  indexTakenFrom(root)
  const said = await gateBuilt(root)
  expect("broken" in said).toBe(true)
  const why = "broken" in said ? said.broken : ""
  expect(why).not.toContain("a gate is built from")
})

test("a gate that could not be built judges nothing rather than passing everything", async () => {
  expect(NO_GATE.named).toEqual([])
  expect(
    await NO_GATE.over({
      root: "/nowhere",
      changed: ["one.txt"],
      after: () => null,
      before: () => null,
    })
  ).toEqual([])
})

test("the two modules loaded late are named as imports, and each reaches a file that is there", () => {
  const loadFrom = createRequire(import.meta.url)
  expect(existsSync(loadFrom.resolve(CHECKING_IN))).toBe(true)
  expect(existsSync(loadFrom.resolve(INDEXING_IN))).toBe(true)
})

test("the index is kept by what that path answers, loaded rather than imported", async () => {
  expect(typeof (await indexingLoaded())).toBe("function")
})

test("a gate is built over the pages, naming the checks that will judge a change", async () => {
  const said = await gateBuilt(HERE)
  expect("gate" in said).toBe(true)
  expect("gate" in said ? said.gate.named.length : 0).toBeGreaterThan(0)
})
