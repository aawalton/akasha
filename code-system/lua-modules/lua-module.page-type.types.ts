import type { Domain } from "../../domains/domain.page-type.ts"
import type { LoadedAs } from "../eso-interfaces/properties/loaded-as.text-property.ts"
import type { Lua } from "./properties/lua.code-file-property.ts"

export type LuaModule = Domain & {
  lua: Lua
  loadedAs?: LoadedAs
}
