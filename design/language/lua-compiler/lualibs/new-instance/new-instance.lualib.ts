import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const newInstance = {
  id: "01a08c40-bd0b-7c60-bda5-568ac47df474",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "new-instance",
  definition: "the instance a class's constructor is run over",
  code: "ts",
  luaExport: "__TS__New",
} as const satisfies Lualib
