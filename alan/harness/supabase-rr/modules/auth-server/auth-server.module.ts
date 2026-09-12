import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const authServer = {
  id: "01a05c97-8af8-74a3-80de-ad41ae3dee2e",
  type: "module",
  slug: "auth-server",
  definition: "who a request is from, by its session cookie or by its bearer token",
  code: "ts",
} as const satisfies Module
