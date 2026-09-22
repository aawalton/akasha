import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageCoreFilter = {
  id: "01a071c6-08d9-7da0-83a9-8cc992a2b7ea",
  type: "page-type/domain",
  slug: "page-core-filter",
  definition: "a filter taken as a condition",
  parts: ["module/filter-to-condition", "module/property-path"],
} as const satisfies Domain
