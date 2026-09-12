import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const fetchStub = {
  id: "01a0655d-daa7-793c-abd8-f849427181e2",
  type: "module",
  slug: "fetch-stub",
  definition: "a fetch put in place of the real one while a test runs",
  code: "ts",
} as const satisfies Module
