import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const instanceOf = {
  id: "01a08202-0fa9-7a86-8b0c-49946b273d29",
  type: "page-type/lualib-helper",
  slug: "instance-of",
  definition: "the answer whether a value descends from a class",
  code: "ts",
  luaExport: "__TS__InstanceOf",
} as const satisfies LualibHelper
