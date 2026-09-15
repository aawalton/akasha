import type { Lua50Config } from "akasha/code/lua-runtime-library/properties/lua50-config.file-property.types.ts"
import type { UniversalConfig } from "akasha/code/lua-runtime-library/properties/universal-config.file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type LuaRuntimeLibrary = Domain & {
  universalConfig: UniversalConfig
  lua50Config: Lua50Config
}
