import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const objectAssign = {
  id: "01a081f7-142d-7cab-93ed-0e2ad7aa0f74",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "object-assign",
  definition: "the object other objects' properties have been written onto",
  code: "ts",
  luaExport: "__TS__ObjectAssign",
} as const satisfies Lualib
