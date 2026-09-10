import { afterAll, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { calculationImportsOnlyTypes } from "./calculation-imports-only-types.code-check.audit.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const HELD = "akasha/one/held.computed-property.code.ts"

const FOLDED = "akasha/one/hours.computed-property-module.code.ts"

const BESIDE = "akasha/one/held.computed-property.ts"

const GONE = "akasha/one/gone.computed-property.code.ts"

const VALUE = 'import { a } from "./x.ts"\n'

const TYPES = 'import type { A } from "./x.ts"\n'

function ranIn(root: string, asked: readonly string[]): undefined {
  const done = ran(["git", "-C", root, ...asked])
  if (done.code !== 0) throw new Error(`the tree at ${root} refused git — ${done.err.trim()}`)
  return undefined
}

function written(root: string, at: string, body: string): undefined {
  mkdirSync(join(root, at.slice(0, at.lastIndexOf("/"))), { recursive: true })
  writeFileSync(join(root, at), body)
}

function rootWith(bodies: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-calculation-audit-")
  for (const [at, body] of Object.entries(bodies)) written(root, at, body)
  ranIn(root, ["init", "-q"])
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
  written(root, GONE, VALUE)
  ranIn(root, ["add", "-A"])
  rmSync(join(root, GONE))

  expect(calculationImportsOnlyTypes(root)).toEqual([])
})
