import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const promiseAll = {
  id: "01a08c58-c2e0-77f5-962c-680e79b962de",
  type: "page-type/lualib-helper",
  slug: "promise-all",
  definition: "one promise answering with every value, or the first rejection",
  code: "ts",
  luaExport: "__TS__PromiseAll",
  createdAt: "2026-09-10T17:23:42.432Z",
  updatedAt: "2026-09-22T10:25:02.000Z",
} as const satisfies LualibHelper
