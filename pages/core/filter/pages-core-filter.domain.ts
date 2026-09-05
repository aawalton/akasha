import type { Domain } from "@akasha/domains/domain"

export const pagesCoreFilter = {
  id: "01a071c6-08d9-7da0-83a9-8cc992a2b7ea",
  pageTypeSlug: "domain",
  slug: "pages-core-filter",
  definition: "a filter read as a condition",
  partSlugs: ["module/filter-to-condition"],
} as const satisfies Domain
