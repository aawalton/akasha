import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const numberIsNan = {
  id: "01a08c43-0a33-7f9f-a032-381bcce40df2",
  type: "page-type/lualib-helper",
  slug: "number-is-nan",
  definition: "whether a value is the value that differs from itself",
  code: "ts",
  luaExport: "__TS__NumberIsNaN",
  createdAt: "2026-09-10T16:59:58.899Z",
  updatedAt: "2026-09-22T10:09:10.000Z",
} as const satisfies LualibHelper
