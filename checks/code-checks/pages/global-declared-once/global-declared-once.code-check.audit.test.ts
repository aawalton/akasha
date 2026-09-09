import { afterAll, expect, test } from "bun:test"
import { said as git } from "@akasha/git/git-running"
import { scratch, staged } from "../typecheck/typecheck.code-check.test-fixtures.ts"
import { globalDeclaredOnce } from "./global-declared-once.code-check.audit.code.ts"

afterAll(scratch.sweep)

const SHARED_AT = "akasha/shared.type-declaration.d.ts"

const MODULE_AT = "akasha/one.module.code.ts"

const HOLDS_VALUE = "declare const HELD: number\n"

const APART = "declare const OTHER: string\n"

function treed(bodies: Readonly<Record<string, string>>): string {
  const root = staged(bodies)
  git(root, ["init", "--quiet"])
  git(root, ["add", "-A"])
  return root
}

function globally(body: string): string {
  return `export const away = 1\n\ndeclare global {\n  ${body}}\n`
}

test("an audit refuses a clash no change carries either file of", () => {
  const root = treed({ [SHARED_AT]: HOLDS_VALUE, [MODULE_AT]: globally(HOLDS_VALUE) })
  const said = globalDeclaredOnce(root)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(MODULE_AT)
  expect(said[0]?.reason).toContain("`HELD` is declared at")
})

test("an audit lets through a module declaring a global no other file declares", () => {
  const root = treed({ [SHARED_AT]: APART, [MODULE_AT]: globally(HOLDS_VALUE) })
  expect(globalDeclaredOnce(root)).toEqual([])
})
