import { afterAll, expect, test } from "bun:test"
import { requireImportExtension } from "./require-import-extension.code-check.audit.code.ts"
import {
  AT,
  BARE,
  NAMED,
  NAMED_AT,
  rooted,
  SPELLED,
  scratch,
  tracked,
} from "./require-import-extension.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("an audit judges every body in the tree, no change naming one of them", () => {
  const root = tracked(rooted(), { [AT]: BARE, [NAMED_AT]: NAMED })

  const said = requireImportExtension(root)

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`./ledger.module.code`")
})

test("an audit lets through a tree where every specifier carries its extension", () => {
  const root = tracked(rooted(), { [AT]: SPELLED, [NAMED_AT]: NAMED })

  expect(requireImportExtension(root)).toEqual([])
})
