import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const delegatedYield = {
  id: "01a08c60-768b-7cff-a722-5bdfda499e11",
  type: "page-type/lualib-helper",
  slug: "delegated-yield",
  definition: "another iterable's values yielded on by the generator running",
  code: "ts",
  luaExport: "__TS__DelegatedYield",
} as const satisfies LualibHelper
