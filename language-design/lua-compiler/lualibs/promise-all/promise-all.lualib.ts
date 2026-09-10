import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const promiseAll = {
  id: "01a08c58-c2e0-77f5-962c-680e79b962de",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "promise-all",
  definition: "one promise answering with every value, or the first rejection",
  code: "ts",
  luaExport: "__TS__PromiseAll",
} as const satisfies Lualib
