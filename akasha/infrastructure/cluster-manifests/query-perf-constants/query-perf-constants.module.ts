import type { Module } from "@akasha/code-system/module"

export const queryPerfConstants = {
  id: "01a06810-1262-756f-a17d-d3471c5d297d",
  pageTypeSlug: "module",
  slug: "query-perf-constants",
  definition: "the thresholds, metric names and alerts a slow database query is judged by",
  code: "ts",
} as const satisfies Module
