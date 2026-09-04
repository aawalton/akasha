import type { Module } from "@akasha/code-system/module"

export const useSingleFlight = {
  id: "01a05be9-d4c6-71e6-8bc2-6358546e2df2",
  pageTypeSlug: "module",
  slug: "use-single-flight",
  definition: "one call at a time, with only the latest request kept waiting",
  code: "ts",
} as const satisfies Module
