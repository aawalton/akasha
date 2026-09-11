import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const promiseAllSettled = {
  id: "01a08c58-f256-740f-adb3-d7598ffc807a",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "promise-all-settled",
  definition: "one promise answering how each of many turned out",
  code: "ts",
  luaExport: "__TS__PromiseAllSettled",
} as const satisfies Lualib
