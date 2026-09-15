import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arraySome = {
  id: "01a081ed-ab46-7b22-90bc-b9191f7a02f4",
  type: "page-type/lualib-helper",
  slug: "array-some",
  definition: "the answer whether any element of an array passes a test",
  code: "ts",
  luaExport: "__TS__ArraySome",
} as const satisfies LualibHelper
