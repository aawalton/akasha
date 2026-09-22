import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const using = {
  id: "01a08c3e-f870-73e2-b0c9-0e3b5fbafa3d",
  type: "page-type/lualib-helper",
  slug: "using",
  definition: "a call disposing of its disposable arguments once that call is over",
  code: "ts",
  luaExport: "__TS__Using",
} as const satisfies LualibHelper
