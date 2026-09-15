import type { LoadedAs } from "akasha/code/eso-interface/properties/loaded-as.text-property.types.ts"
import type { Lua } from "akasha/code/lua-module/properties/lua.code-file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type LuaModule = Domain & {
  lua: Lua
  loadedAs?: LoadedAs
}
