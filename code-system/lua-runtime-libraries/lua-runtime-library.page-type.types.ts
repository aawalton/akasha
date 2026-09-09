import type { Domain } from "../../domains/domain.page-type.ts"
import type { Lua50Config } from "./properties/lua50-config.file-property.ts"
import type { UniversalConfig } from "./properties/universal-config.file-property.ts"

export type LuaRuntimeLibrary = Domain & {
  universalConfig: UniversalConfig
  lua50Config: Lua50Config
}
