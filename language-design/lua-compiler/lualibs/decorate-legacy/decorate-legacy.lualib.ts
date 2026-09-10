import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const decorateLegacy = {
  id: "01a08c47-090a-7f93-8527-593a46684e1e",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "decorate-legacy",
  definition: "a target run through the decorators of the first decorator proposal, last to first",
  code: "ts",
  luaExport: "__TS__DecorateLegacy",
} as const satisfies Lualib
