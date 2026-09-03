import type { Module } from "@akasha/code-system/module"

export const retryRunning = {
  id: "01a068d9-1a58-7646-9e60-2d3cb4d6a6c7",
  pageTypeSlug: "module",
  slug: "retry-running",
  definition: "putting the steps a retry names back to pending",
  code: "ts",
} as const satisfies Module
