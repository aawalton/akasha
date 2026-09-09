import type { Lualib } from "@akasha/code/lualib"

export const stringStartsWith = {
  id: "01a081f7-142d-744c-9e42-373864d7631f",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "string-starts-with",
  definition: "the answer whether text starts with other text at a position",
  code: "ts",
  luaExport: "__TS__StringStartsWith",
} as const satisfies Lualib
