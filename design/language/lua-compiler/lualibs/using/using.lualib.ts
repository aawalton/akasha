import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const using = {
  id: "01a08c3e-f870-73e2-b0c9-0e3b5fbafa3d",
  type: "lualib",
  slug: "using",
  definition: "a call whose disposable arguments are disposed of once the call is over",
  code: "ts",
  luaExport: "__TS__Using",
} as const satisfies Lualib
