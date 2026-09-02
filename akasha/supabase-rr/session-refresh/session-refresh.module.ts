import type { Module } from "../../code-system/modules/module.page-type.ts"

export const sessionRefresh = {
  id: "01a05c97-8af7-7b0e-b1d4-de7dac00edd4",
  pageTypeSlug: "module",
  slug: "session-refresh",
  definition: "the session refreshed as a request arrives, with the cookies that refresh sets",
  code: "ts",
} as const satisfies Module
