import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const promiseAny = {
  id: "01a08c59-27e4-7bfa-9e75-a9fc629c20e9",
  type: "page-type/lualib-helper",
  slug: "promise-any",
  definition: "a promise answering with the first value, or every rejection",
  code: "ts",
  luaExport: "__TS__PromiseAny",
} as const satisfies LualibHelper
