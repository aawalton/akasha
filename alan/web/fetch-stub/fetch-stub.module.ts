import type { Module } from "@akasha/code-system/module"

export const fetchStub = {
  id: "01a0655d-daa7-793c-abd8-f849427181e2",
  pageTypeSlug: "module",
  slug: "fetch-stub",
  definition: "a fetch standing in for the real one while a test runs",
  code: "ts",
} as const satisfies Module
