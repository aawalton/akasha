import type { Module } from "@akasha/code-system/module"

export const benchmarkMarginSweep = {
  id: "01a0694b-36ca-70bc-86a7-0b37888fcba4",
  pageTypeSlug: "module",
  slug: "benchmark-margin-sweep",
  definition:
    "the dispatch decider run over a grid of capacity margins to count what would go out of cpu",
  code: "ts",
} as const satisfies Module
