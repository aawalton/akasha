import { afterAll, expect, test } from "bun:test"
import { specifierNamesAPackage } from "./specifier-names-a-package.code-check.audit.code.ts"
import {
  AT,
  GONE,
  STATED,
  scratch,
  tracked,
} from "./specifier-names-a-package.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("an audit judges every body in the tree, no change naming one of them", () => {
  const said = specifierNamesAPackage(tracked({ [AT]: GONE }))

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("@akasha/gone")
})

test("an audit lets through a tree reaching only by names the manifests state", () => {
  expect(specifierNamesAPackage(tracked({ [AT]: STATED }))).toEqual([])
})
