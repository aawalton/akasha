import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const asyncAwaiter = {
  id: "01a081c8-669c-7b45-994d-238ca9f5c438",
  type: "page-type/lualib-helper",
  slug: "async-awaiter",
  definition: "the promise an async function body becomes",
  code: "ts",
  luaExport: "__TS__AsyncAwaiter",
  createdAt: "2026-09-08T16:09:49.468Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
