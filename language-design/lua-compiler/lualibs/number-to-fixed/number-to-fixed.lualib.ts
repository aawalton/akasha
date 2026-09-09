import type { Lualib } from "@akasha/code/lualib"

export const numberToFixed = {
  id: "01a08202-0fa9-795e-99f1-aa3a8b43c20d",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "number-to-fixed",
  definition: "the text a number takes with a stated count of fraction digits",
  code: "ts",
  luaExport: "__TS__NumberToFixed",
} as const satisfies Lualib
