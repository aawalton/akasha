import type { LoadedAs } from "akasha/code-system/eso-interfaces/properties/loaded-as.text-property.types.ts"
import type { Lua } from "akasha/code-system/lua-modules/properties/lua.code-file-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type LuaModule = Domain & {
  lua: Lua
  loadedAs?: LoadedAs
}
