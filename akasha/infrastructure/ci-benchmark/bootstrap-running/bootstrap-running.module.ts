import type { Module } from "@akasha/code-system/module"

export const bootstrapRunning = {
  id: "01a068dd-71dc-79a1-a1ea-62a5879ccd55",
  pageTypeSlug: "module",
  slug: "bootstrap-running",
  definition: "a whole bootstrap workflow run to its end on this machine",
  code: "ts",
} as const satisfies Module
