import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const coroutines = {
  id: "01a081c8-1548-7757-b00e-bb9c24454be6",
  type: "page-type/lualib-helper",
  slug: "coroutines",
  definition: "the coroutine calls a Lua host offers",
  code: "ts",
  luaExport: "__TS__Coroutines",
} as const satisfies LualibHelper
