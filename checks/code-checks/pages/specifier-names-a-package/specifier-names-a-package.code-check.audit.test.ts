import { afterAll, expect, test } from "bun:test"
import { specifierNamesAPackage } from "akasha/checks/code-checks/pages/specifier-names-a-package/specifier-names-a-package.code-check.audit.code.ts"
import {
  AT,
  GONE,
  rooted,
  STATED,
  scratch,
} from "akasha/checks/code-checks/pages/specifier-names-a-package/specifier-names-a-package.code-check.decision.test-fixtures.ts"
import { tracked } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"

afterAll(scratch.sweep)

test("an audit judges every body in the tree, no change naming one of them", () => {
  const said = specifierNamesAPackage(tracked(rooted({ [AT]: GONE })))

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("@akasha/gone")
})

test("an audit lets through a tree reaching only by names the manifests state", () => {
  expect(specifierNamesAPackage(tracked(rooted({ [AT]: STATED })))).toEqual([])
})
