import type { Lualib } from "@akasha/code/lualib"

export const stringSubstring = {
  id: "01a081f7-142d-7eed-bf68-b7da58f25b14",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "string-substring",
  definition: "the text between two indexes of other text, the lower index first",
  code: "ts",
  luaExport: "__TS__StringSubstring",
} as const satisfies Lualib
