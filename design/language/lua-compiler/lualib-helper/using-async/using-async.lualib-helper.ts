import type { Lualib } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const usingAsync = {
  id: "01a08c41-078a-7bfe-abd3-af93139d0cb2",
  type: "lualib",
  slug: "using-async",
  definition: "a call whose disposable arguments are disposed of, awaiting the asynchronous ones",
  code: "ts",
  luaExport: "__TS__UsingAsync",
} as const satisfies Lualib
