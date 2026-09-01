import type { Module } from "@akasha/code-system/module"

export const overServer = {
  id: "01a05bd6-c533-7600-b18c-c96577f03603",
  pageTypeSlug: "module",
  slug: "over-server",
  definition: "a page write sent to the server rather than run against the store",
  code: "ts",
} as const satisfies Module
