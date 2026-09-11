import type { Lua50Config } from "akasha/code-system/lua-runtime-libraries/properties/lua50-config.file-property.ts"
import type { UniversalConfig } from "akasha/code-system/lua-runtime-libraries/properties/universal-config.file-property.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type LuaRuntimeLibrary = Domain & {
  universalConfig: UniversalConfig
  lua50Config: Lua50Config
}
