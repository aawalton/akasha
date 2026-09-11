import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const championPointMappings = {
  id: "01a06340-4913-75fd-b073-fa15cf0ed3c4",
  pageTypeSlug: "module",
  type: "module",
  slug: "champion-point-mappings",
  definition: "the champion point index and id tables the capture addon reads",
  code: "ts",
} as const satisfies Module
