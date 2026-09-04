import type { Module } from "@akasha/code-system/module"

export const jwtExp = {
  id: "01a05b69-4554-714f-9eff-377a5483bdac",
  pageTypeSlug: "module",
  slug: "jwt-exp",
  definition: "when a token expires, and how long before that it is refreshed",
  code: "ts",
} as const satisfies Module
