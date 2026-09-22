import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const promiseAll = {
  id: "01a08c58-c2e0-77f5-962c-680e79b962de",
  type: "page-type/lualib-helper",
  slug: "promise-all",
  definition: "one promise answering with every value, or the first rejection",
  code: "ts",
  luaExport: "__TS__PromiseAll",
} as const satisfies LualibHelper
