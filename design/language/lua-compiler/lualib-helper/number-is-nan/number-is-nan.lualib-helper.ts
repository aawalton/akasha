import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const numberIsNan = {
  id: "01a08c43-0a33-7f9f-a032-381bcce40df2",
  type: "page-type/lualib-helper",
  slug: "number-is-nan",
  definition: "whether a value is the value that differs from itself",
  code: "ts",
  luaExport: "__TS__NumberIsNaN",
} as const satisfies LualibHelper
