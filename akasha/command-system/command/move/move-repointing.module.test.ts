import { expect, test } from "bun:test"
import { ARRIVES, CODE, HOLDER, TARGET } from "./move.command.test-fixtures.ts"
import { repointed } from "./move-repointing.module.code.ts"

test("a specifier reaching a file that moves in the same act reaches its new path", () => {
  const moved = new Map([[TARGET, ARRIVES]])
  const said = repointed(HOLDER, HOLDER, CODE, moved)
  expect(said).toContain('from "../four/other.module.code.ts"')
  expect(said).toContain('import ts from "typescript"')
})

test("a body naming nothing that moved comes back as it stands", () => {
  expect(repointed(HOLDER, HOLDER, CODE, new Map())).toBe(CODE)
})
