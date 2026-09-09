import type { Lualib } from "@akasha/code/lualib"

export const stringTrim = {
  id: "01a081ed-ab46-7949-88e2-af34c0c84bcb",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "string-trim",
  definition: "the text left once the whitespace at both ends is taken away",
  code: "ts",
  luaExport: "__TS__StringTrim",
} as const satisfies Lualib
