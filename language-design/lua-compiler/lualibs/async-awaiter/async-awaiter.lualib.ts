import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const asyncAwaiter = {
  id: "01a081c8-669c-7b45-994d-238ca9f5c438",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "async-awaiter",
  definition: "the promise an async function body becomes",
  code: "ts",
  luaExport: "__TS__AsyncAwaiter",
} as const satisfies Lualib
