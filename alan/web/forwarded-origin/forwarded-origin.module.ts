import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const forwardedOrigin = {
  id: "01a0655d-daa7-729b-bedd-841af19e555b",
  type: "module",
  slug: "forwarded-origin",
  definition: "the origin a request came in at, read from what the proxy forwarded",
  code: "ts",
} as const satisfies Module
