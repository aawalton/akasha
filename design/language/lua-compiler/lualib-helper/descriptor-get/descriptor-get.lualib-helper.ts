import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const descriptorGet = {
  id: "01a08c45-34c5-7c22-8349-2a7674ac0fc6",
  type: "page-type/lualib-helper",
  slug: "descriptor-get",
  definition: "the value a key reaches, walking the metatables for a raw field or a getter",
  code: "ts",
  luaExport: "__TS__DescriptorGet",
  createdAt: "2026-09-10T17:02:20.869Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
