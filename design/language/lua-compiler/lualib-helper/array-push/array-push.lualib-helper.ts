import type { Lualib } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arrayPush = {
  id: "01a081dd-f309-7cf2-ba7f-c67c0ddec8a9",
  type: "lualib",
  slug: "array-push",
  definition: "the length an array reaches once items are added to its end",
  code: "ts",
  luaExport: "__TS__ArrayPush",
} as const satisfies Lualib
