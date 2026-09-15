import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arrayReduceRight = {
  id: "01a08c5d-7e26-7bb8-abac-05805fff764f",
  type: "page-type/lualib-helper",
  slug: "array-reduce-right",
  definition: "an array folded from its end into one value",
  code: "ts",
  luaExport: "__TS__ArrayReduceRight",
} as const satisfies LualibHelper
