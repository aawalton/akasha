import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arrayReduceRight = {
  id: "01a08c5d-7e26-7bb8-abac-05805fff764f",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-reduce-right",
  definition: "an array folded from its end into one value",
  code: "ts",
  luaExport: "__TS__ArrayReduceRight",
} as const satisfies Lualib
