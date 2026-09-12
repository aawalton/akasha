import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import { calculationImportsOnlyTypes } from "akasha/checks/code-checks/pages/calculation-imports-only-types/calculation-imports-only-types.code-check.audit.code.ts"
import { said as git } from "akasha/git/running/git-running.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const HELD = "akasha/one/held.computed-property.code.ts"

const FOLDED = "akasha/one/hours.computed-property-module.code.ts"

const BESIDE = "akasha/one/held.computed-property.ts"

const GONE = "akasha/one/gone.computed-property.code.ts"

const VALUE = 'import { a } from "./x.ts"\n'

const TYPES = 'import type { A } from "./x.ts"\n'

function rootWith(bodies: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-calculation-audit-")
  for (const [at, body] of Object.entries(bodies)) writing(root, at, body)
  git(root, ["init", "-q"])
  return root
}

test("an audit reads every text the tree holds rather than a change", () => {
  const said = calculationImportsOnlyTypes(rootWith({ [HELD]: VALUE }))
  expect(said.map((one) => one.path)).toEqual([HELD])
  expect(said[0]?.reason).toContain("`a`")
})

test("an audit lets a calculation importing only types through", () => {
  expect(calculationImportsOnlyTypes(rootWith({ [HELD]: TYPES }))).toEqual([])
})

test("an audit judges a computed-property-module's code file by the same rule", () => {
  const root = rootWith({ [FOLDED]: VALUE })
  expect(calculationImportsOnlyTypes(root).map((one) => one.path)).toEqual([FOLDED])
})

test("an audit passes over a file that is no calculation's code file", () => {
  expect(calculationImportsOnlyTypes(rootWith({ [BESIDE]: VALUE }))).toEqual([])
})

test("a path the tree names and the disk no longer holds reads as nothing", () => {
  const root = rootWith({ [HELD]: TYPES })
  writing(root, GONE, VALUE)
  git(root, ["add", "-A"])
  rmSync(join(root, GONE))

  expect(calculationImportsOnlyTypes(root)).toEqual([])
})
