import type { Lualib } from "@akasha/code/lualib"

export const instanceOf = {
  id: "01a08202-0fa9-7a86-8b0c-49946b273d29",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "instance-of",
  definition: "the answer whether a value descends from a class",
  code: "ts",
  luaExport: "__TS__InstanceOf",
} as const satisfies Lualib
