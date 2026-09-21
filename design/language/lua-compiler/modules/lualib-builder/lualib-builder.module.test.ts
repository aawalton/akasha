import { expect, test } from "bun:test"
import { LuaTarget } from "akasha/design/language/lua-compiler/modules/compiler-options/compiler-options.module.code.ts"
import "akasha/design/language/lua-compiler/modules/lua-printer/lua-printer.module.code.ts"
import { buildLuaLib } from "akasha/design/language/lua-compiler/modules/lualib-builder/lualib-builder.module.code.ts"
import { LuaLibFeature } from "akasha/design/language/lua-compiler/modules/lualib-features/lualib-features.module.code.ts"
import "akasha/design/language/lua-compiler/modules/transpile-transpiler/transpile-transpiler.module.code.ts"

test("a build emits the lualib sources alone, so a file reached for a type is no feature", () => {
  const built = buildLuaLib(LuaTarget.Lua51)
  const named = new Set<string>(Object.values(LuaLibFeature))
  expect(Object.keys(built.modulesInfo)).toHaveLength(named.size)
  expect(built.fullBundle).toContain("__TS__ArrayAt")
})
