import type { lua50Config } from "akasha/code-system/lua-runtime-libraries/properties/lua50-config.file-property.ts"

export type Lua50Config = (typeof lua50Config.extensions)[number]
