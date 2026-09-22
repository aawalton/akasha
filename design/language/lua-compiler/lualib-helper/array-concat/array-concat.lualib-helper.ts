import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arrayConcat = {
  id: "01a081de-4bc1-7a16-9d86-9ac50836fbc3",
  type: "page-type/lualib-helper",
  slug: "array-concat",
  definition: "the array joining an array and further items",
  code: "ts",
  luaExport: "__TS__ArrayConcat",
} as const satisfies LualibHelper
