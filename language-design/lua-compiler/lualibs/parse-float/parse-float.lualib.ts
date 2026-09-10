import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const parseFloat = {
  id: "01a08c49-a2d3-7b2e-a31b-b2e49c0ab21d",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "parse-float",
  definition: "the number a string opens with, or NaN where it opens with none",
  code: "ts",
  luaExport: "__TS__ParseFloat",
} as const satisfies Lualib
