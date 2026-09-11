import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const generator = {
  id: "01a08c60-0bbc-7a1f-9177-19ccc0e3ec16",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "generator",
  definition: "a function that yields, run as a coroutine",
  code: "ts",
  luaExport: "__TS__Generator",
} as const satisfies Lualib
