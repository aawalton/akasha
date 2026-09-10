import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const arrayConcat = {
  id: "01a081de-4bc1-7a16-9d86-9ac50836fbc3",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-concat",
  definition: "the array an array and further items are joined into",
  code: "ts",
  luaExport: "__TS__ArrayConcat",
} as const satisfies Lualib
