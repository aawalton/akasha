import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const descriptorGet = {
  id: "01a08c45-34c5-7c22-8349-2a7674ac0fc6",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "descriptor-get",
  definition: "the value a key reaches, walking the metatables for a raw field or a getter",
  code: "ts",
  luaExport: "__TS__DescriptorGet",
} as const satisfies Lualib
