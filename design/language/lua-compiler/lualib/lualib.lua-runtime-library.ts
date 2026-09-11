import type { LuaRuntimeLibrary } from "akasha/code-system/lua-runtime-libraries/lua-runtime-library.page-type.types.ts"

export const lualib = {
  id: "01a06759-2aa6-7003-b87a-4463c5e70141",
  pageTypeSlug: "lua-runtime-library",
  type: "lua-runtime-library",
  slug: "lualib",
  definition: "the JavaScript runtime an addon's Lua carries with it",
  universalConfig: "json",
  lua50Config: "json",
} as const satisfies LuaRuntimeLibrary
