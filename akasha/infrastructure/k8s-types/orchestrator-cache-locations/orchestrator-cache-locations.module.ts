import type { Module } from "@akasha/code-system/module"

export const orchestratorCacheLocations = {
  id: "01a06735-dd9c-700a-8ad6-ed91c294657a",
  pageTypeSlug: "module",
  slug: "orchestrator-cache-locations",
  definition: "where each web app keeps its checkout cache on a node",
  code: "ts",
} as const satisfies Module
