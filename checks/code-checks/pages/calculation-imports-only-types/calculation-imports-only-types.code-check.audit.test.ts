import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { pathFiled } from "@akasha/indexes/testing"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { calculationImportsOnlyTypes } from "./calculation-imports-only-types.code-check.audit.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const HELD = "akasha/one/held.computed-property.code.ts"

const FOLDED = "akasha/one/hours.computed-property-module.code.ts"

const BESIDE = "akasha/one/held.computed-property.ts"

const UNFILED = "akasha/one/unfiled.computed-property.code.ts"

const VALUE = 'import { a } from "./x.ts"\n'

const TYPES = 'import type { A } from "./x.ts"\n'

function written(root: string, at: string, body: string): undefined {
  mkdirSync(join(root, at.slice(0, at.lastIndexOf("/"))), { recursive: true })
  writeFileSync(join(root, at), body)
}

function rootWith(bodies: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-calculation-audit-")
  for (const [at, body] of Object.entries(bodies)) {
    written(root, at, body)
    pathFiled(root, at, [{ path: at, id: "01a04b5e-39e5-7730-9318-c34e7807c200" }])
  }
  return root
}

test("an audit reads every path the index files rather than a change", () => {
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

test("an audit judges no file the index does not file", () => {
  const root = rootWith({ [HELD]: TYPES })
  written(root, UNFILED, VALUE)
  expect(calculationImportsOnlyTypes(root)).toEqual([])
})
