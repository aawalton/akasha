import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const delegatedYield = {
  id: "01a08c60-768b-7cff-a722-5bdfda499e11",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "delegated-yield",
  definition: "another iterable's values yielded on by the generator running",
  code: "ts",
  luaExport: "__TS__DelegatedYield",
} as const satisfies Lualib
