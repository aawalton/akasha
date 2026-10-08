import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const queueMicrotask = {
  id: "01a081d1-2285-75ce-b055-c42140dc668d",
  type: "page-type/lualib-helper",
  slug: "queue-microtask",
  definition: "the call a callback is made on with no delay",
  code: "ts",
  luaExport: "__TS__QueueMicrotask",
  createdAt: "2026-09-08T16:19:21.861Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
