import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const numberIsInteger = {
  id: "01a08c42-e5e4-7dbe-9ffa-734f929dae33",
  type: "page-type/lualib-helper",
  slug: "number-is-integer",
  definition: "whether a value is a finite number with no fractional part",
  code: "ts",
  luaExport: "__TS__NumberIsInteger",
} as const satisfies LualibHelper
