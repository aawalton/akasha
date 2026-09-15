import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const unpack = {
  id: "01a08c5c-8fdc-7ff5-a0c3-f0f2586c5091",
  type: "page-type/lualib-helper",
  slug: "unpack",
  definition: "a list opened out into the many values it holds",
  code: "ts",
  lua50Code: "ts",
  luaExport: "__TS__Unpack",
} as const satisfies LualibHelper
