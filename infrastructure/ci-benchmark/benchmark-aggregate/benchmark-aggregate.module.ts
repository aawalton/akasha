import type { Module } from "@akasha/code-system/module"

export const benchmarkAggregate = {
  id: "01a0694b-36ca-77e7-a27f-0e2083f74540",
  pageTypeSlug: "module",
  slug: "benchmark-aggregate",
  definition:
    "one run's step timings rolled up by phase, beside the failures declared as environmental",
  code: "ts",
} as const satisfies Module
