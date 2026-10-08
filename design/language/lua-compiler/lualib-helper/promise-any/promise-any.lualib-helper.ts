import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const promiseAny = {
  id: "01a08c59-27e4-7bfa-9e75-a9fc629c20e9",
  type: "page-type/lualib-helper",
  slug: "promise-any",
  definition: "one promise answering with the first value, or every rejection",
  code: "ts",
  luaExport: "__TS__PromiseAny",
  createdAt: "2026-09-10T17:24:08.292Z",
  updatedAt: "2026-09-22T10:25:02.000Z",
} as const satisfies LualibHelper
