import type { Lualib } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arrayConcat = {
  id: "01a081de-4bc1-7a16-9d86-9ac50836fbc3",
  type: "lualib",
  slug: "array-concat",
  definition: "the array an array and further items are joined into",
  code: "ts",
  luaExport: "__TS__ArrayConcat",
} as const satisfies Lualib
