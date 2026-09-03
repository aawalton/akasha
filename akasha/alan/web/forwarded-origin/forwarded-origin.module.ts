import type { Module } from "@akasha/code-system/module"

export const forwardedOrigin = {
  id: "01a0655d-daa7-729b-bedd-841af19e555b",
  pageTypeSlug: "module",
  slug: "forwarded-origin",
  definition: "the origin a request came in at, read from what the proxy forwarded",
  code: "ts",
} as const satisfies Module
