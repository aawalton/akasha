import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const classExtends = {
  id: "01a08202-0fa9-7428-b852-01082e7e80e5",
  type: "page-type/lualib-helper",
  slug: "class-extends",
  definition: "the metatables tying a class to its parent class",
  code: "ts",
  luaExport: "__TS__ClassExtends",
} as const satisfies LualibHelper
