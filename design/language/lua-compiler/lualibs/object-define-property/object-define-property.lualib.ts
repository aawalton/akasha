import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const objectDefineProperty = {
  id: "01a08c45-bcc0-7a35-b253-8832b0efd5c7",
  type: "lualib",
  slug: "object-define-property",
  definition: "a property defined on an object from a descriptor, with a numeric key shifted",
  code: "ts",
  luaExport: "__TS__ObjectDefineProperty",
} as const satisfies Lualib
