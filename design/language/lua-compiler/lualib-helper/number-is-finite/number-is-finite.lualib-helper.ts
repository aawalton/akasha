import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const numberIsFinite = {
  id: "01a08c42-9fe4-7a0b-8b26-91438bdb85a0",
  type: "page-type/lualib-helper",
  slug: "number-is-finite",
  definition: "whether a value is a number that is neither NaN nor either infinity",
  code: "ts",
  luaExport: "__TS__NumberIsFinite",
  createdAt: "2026-09-10T16:59:31.684Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
