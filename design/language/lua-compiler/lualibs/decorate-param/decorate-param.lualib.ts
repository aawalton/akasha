import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const decorateParam = {
  id: "01a08c47-4166-72f8-ba80-ce03951cdfda",
  type: "lualib",
  slug: "decorate-param",
  definition: "a parameter decorator wrapped as a decorator the legacy run can call",
  code: "ts",
  luaExport: "__TS__DecorateParam",
} as const satisfies Lualib
