import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const arrayPush = {
  id: "01a081dd-f309-7cf2-ba7f-c67c0ddec8a9",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-push",
  definition: "the length an array reaches once items are added to its end",
  code: "ts",
  luaExport: "__TS__ArrayPush",
} as const satisfies Lualib
