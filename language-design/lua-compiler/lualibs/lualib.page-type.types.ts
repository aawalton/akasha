import type { Code } from "../../../code-system/modules/properties/code.code-file-property.ts"
import type { Domain } from "../../../domains/domain.page-type.types.ts"
import type { CompiledLua } from "./properties/compiled-lua.code-file-property.ts"
import type { LuaExport } from "./properties/lua-export.text-property.ts"
import type { LuaFeature } from "./properties/lua-feature.text-property.ts"
import type { Lua50Code } from "./properties/lua50-code.code-file-property.ts"

export type Lualib = Domain & {
  code: Code
  lua50Code?: Lua50Code
  compiledLua?: CompiledLua
  luaExport: LuaExport
  luaFeature?: LuaFeature
}
