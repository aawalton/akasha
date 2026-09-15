import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const numberIsFinite = {
  id: "01a08c42-9fe4-7a0b-8b26-91438bdb85a0",
  type: "lualib-helper",
  slug: "number-is-finite",
  definition: "whether a value is a number that is neither NaN nor either infinity",
  code: "ts",
  luaExport: "__TS__NumberIsFinite",
} as const satisfies LualibHelper
