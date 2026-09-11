import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const promiseRace = {
  id: "01a08c59-57c2-7527-b475-90166b8a3bda",
  type: "lualib",
  slug: "promise-race",
  definition: "one promise answering with whichever of many settles first",
  code: "ts",
  luaExport: "__TS__PromiseRace",
} as const satisfies Lualib
