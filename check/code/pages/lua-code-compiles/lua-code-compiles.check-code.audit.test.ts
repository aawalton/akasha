import { afterAll, expect, test } from "bun:test"
import { luaCodeCompiles } from "akasha/check/code/pages/lua-code-compiles/lua-code-compiles.check-code.audit.code.ts"
import {
  BROKEN,
  CLEAN,
  ONE,
  rooted,
  scratch,
} from "akasha/check/code/pages/lua-code-compiles/lua-code-compiles.check-code.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("an audit compiles every library's configs, no change naming a file of theirs", () => {
  const said = luaCodeCompiles(rooted({ [ONE]: BROKEN }))
  expect(said.map((one) => one.path)).toEqual([ONE])
  expect(said[0]?.reason).toContain("TS2322")
})

test("an audit lets through a library whose configs compile", () => {
  expect(luaCodeCompiles(rooted({ [ONE]: CLEAN }))).toEqual([])
})
