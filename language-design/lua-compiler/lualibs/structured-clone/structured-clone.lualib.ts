import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const structuredClone = {
  id: "01a08c41-35bc-7c86-a2bb-34c5375cbfd8",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "structured-clone",
  definition: "a deep copy of a value, where a reference held twice is copied once",
  code: "ts",
  luaExport: "__TS__StructuredClone",
} as const satisfies Lualib
