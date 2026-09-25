import { afterAll, expect, test } from "bun:test"
import { luaCodeCompiles } from "akasha/check/code/pages/lua-code-compiles/lua-code-compiles.check-code.check.code.ts"
import {
  BROKEN,
  CLEAN,
  ONE,
  rooted,
  scratch,
} from "akasha/check/code/pages/lua-code-compiles/lua-code-compiles.check-code.decision.test-fixtures.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import { landing } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

const APART = "lib/one.ts"

test("a named file the change leaves not compiling is refused under both configs", () => {
  const root = rooted({ [ONE]: CLEAN })
  const said = luaCodeCompiles(landing(root, { [ONE]: bytesOf(BROKEN) }), shadowAt(root))
  expect(said.map((one) => one.path)).toEqual([ONE])
  expect(said[0]?.reason).toContain("TS2322")
  expect(said[0]?.reason).toContain("tsconfig.json and ")
})

test("a change reaching no library is judged clean without compiling anything", () => {
  const root = rooted({ [ONE]: BROKEN })
  const said = luaCodeCompiles(landing(root, { [APART]: bytesOf(BROKEN) }), shadowAt(root))
  expect(said).toEqual([])
})

test("a config and a body of TypeScript are input to the check, and a note is not", () => {
  const shadow = shadowAt(rooted({}))
  const held = ["lib/tsconfig.lua50.json", APART, "lib/notes.md"]
  expect(held.map((one) => luaCodeCompiles.isInput(one, shadow))).toEqual([true, true, false])
})
