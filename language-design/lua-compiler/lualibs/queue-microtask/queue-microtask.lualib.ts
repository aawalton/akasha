import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const queueMicrotask = {
  id: "01a081d1-2285-75ce-b055-c42140dc668d",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "queue-microtask",
  definition: "the call a callback is made on with no delay",
  code: "ts",
  luaExport: "__TS__QueueMicrotask",
} as const satisfies Lualib
