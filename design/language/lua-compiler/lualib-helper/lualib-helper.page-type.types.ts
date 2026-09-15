import type { Code } from "akasha/code/module/properties/code.code-file-property.types.ts"
import type { CompiledLua } from "akasha/design/language/lua-compiler/lualib-helper/properties/compiled-lua.code-file-property.types.ts"
import type { LuaExport } from "akasha/design/language/lua-compiler/lualib-helper/properties/lua-export.text-property.types.ts"
import type { LuaFeature } from "akasha/design/language/lua-compiler/lualib-helper/properties/lua-feature.text-property.types.ts"
import type { Lua50Code } from "akasha/design/language/lua-compiler/lualib-helper/properties/lua50-code.code-file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type Lualib = Domain & {
  code: Code
  lua50Code?: Lua50Code
  compiledLua?: CompiledLua
  luaExport: LuaExport
  luaFeature?: LuaFeature
}
