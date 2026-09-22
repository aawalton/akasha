import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const promiseRace = {
  id: "01a08c59-57c2-7527-b475-90166b8a3bda",
  type: "page-type/lualib-helper",
  slug: "promise-race",
  definition: "a promise answering with whichever of many settles first",
  code: "ts",
  luaExport: "__TS__PromiseRace",
} as const satisfies LualibHelper
