import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const countVarargs = {
  id: "01a08c5c-5e23-7b2a-8ca3-8dc69cdc7e92",
  type: "page-type/lualib-helper",
  slug: "count-varargs",
  definition: "how many arguments were passed, holes and all",
  code: "ts",
  lua50Code: "ts",
  luaExport: "__TS__CountVarargs",
  createdAt: "2026-09-10T17:27:38.787Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
