import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const promiseAllSettled = {
  id: "01a08c58-f256-740f-adb3-d7598ffc807a",
  type: "page-type/lualib-helper",
  slug: "promise-all-settled",
  definition: "a promise answering how each of many turned out",
  code: "ts",
  luaExport: "__TS__PromiseAllSettled",
  createdAt: "2026-09-10T17:23:54.582Z",
  updatedAt: "2026-09-22T10:11:20.000Z",
} as const satisfies LualibHelper
