import type { LuaRuntimeLibrary } from "akasha/code/lua-runtime-library/lua-runtime-library.page-type.types.ts"

export const lualib = {
  id: "01a06759-2aa6-7003-b87a-4463c5e70141",
  type: "page-type/lua-runtime-library",
  slug: "lualib",
  definition: "the JavaScript runtime an addon's Lua carries with it",
  parts: ["type-declaration/lua-class"],
  universalConfig: "json",
  lua50Config: "json",
  createdAt: "2026-09-03T12:58:12.006Z",
  updatedAt: "2026-09-24T17:04:31.000Z",
} as const satisfies LuaRuntimeLibrary
