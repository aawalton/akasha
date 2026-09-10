import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const arrayFlat = {
  id: "01a081e7-49c9-7570-867a-1c0a57761a6d",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-flat",
  definition: "the array an array's nested arrays are lifted into, down to a depth",
  code: "ts",
  luaExport: "__TS__ArrayFlat",
} as const satisfies Lualib
