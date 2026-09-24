import { afterAll, expect, test } from "bun:test"
import { luaRuntimeLibraryCompiles } from "akasha/check/code/pages/lua-runtime-library-compiles/lua-runtime-library-compiles.check-code.audit.code.ts"
import {
  BROKEN,
  CLEAN,
  ONE,
  rooted,
  scratch,
} from "akasha/check/code/pages/lua-runtime-library-compiles/lua-runtime-library-compiles.check-code.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("an audit compiles every library's configs, no change naming a file of theirs", () => {
  const said = luaRuntimeLibraryCompiles(rooted({ [ONE]: BROKEN }))
  expect(said.map((one) => one.path)).toEqual([ONE])
  expect(said[0]?.reason).toContain("TS2322")
})

test("an audit lets through a library whose configs compile", () => {
  expect(luaRuntimeLibraryCompiles(rooted({ [ONE]: CLEAN }))).toEqual([])
})
