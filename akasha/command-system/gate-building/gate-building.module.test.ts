import { afterAll, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { repoWith, scratch } from "../landing/landing.module.test-fixtures.ts"
import { rootOf } from "../rooting/rooting.module.code.ts"
import {
  CHECKING_AT,
  gateBuilt,
  INDEXING_AT,
  indexingLoaded,
  NO_GATE,
} from "./gate-building.module.code.ts"

afterAll(scratch.sweep)

const HERE = rootOf(import.meta.path)

test("the gate reaches the checks late, and a root carrying no check index will not build one", () => {
  const root = repoWith({ "one.txt": "committed" })
  const said = gateBuilt(root)
  expect("broken" in said).toBe(true)
  const why = "broken" in said ? said.broken : ""
  expect(why).toContain("identity/page/id")
  expect(why).not.toContain("a gate is built from")
})

test("a gate that could not be built judges nothing rather than passing everything", () => {
  expect(NO_GATE.named).toEqual([])
  expect(
    NO_GATE.over({ root: "/nowhere", changed: ["one.txt"], after: () => null, before: () => null })
  ).toEqual([])
})

test("the two modules loaded late are named as paths under the root, and both stand", () => {
  expect(existsSync(join(HERE, CHECKING_AT))).toBe(true)
  expect(existsSync(join(HERE, INDEXING_AT))).toBe(true)
})

test("the index is kept by what that path answers, loaded rather than imported", () => {
  expect(typeof indexingLoaded()).toBe("function")
})

test("a gate is built over the corpus, naming the checks that will judge a patch", () => {
  const said = gateBuilt(HERE)
  expect("gate" in said).toBe(true)
  expect("gate" in said ? said.gate.named.length : 0).toBeGreaterThan(0)
})
