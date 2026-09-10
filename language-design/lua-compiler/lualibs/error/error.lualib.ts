import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const error = {
  id: "01a081c0-77ff-7fd1-9c22-66755319e3b9",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "error",
  definition: "the error type a thrown value is",
  code: "ts",
  luaExport: "Error",
} as const satisfies Lualib
