import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const structuredClone = {
  id: "01a08c41-35bc-7c86-a2bb-34c5375cbfd8",
  type: "page-type/lualib-helper",
  slug: "structured-clone",
  definition: "a deep copy of a value, where a reference held twice is copied once",
  code: "ts",
  luaExport: "__TS__StructuredClone",
} as const satisfies LualibHelper
