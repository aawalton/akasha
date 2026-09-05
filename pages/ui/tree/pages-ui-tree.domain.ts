import type { Domain } from "@akasha/domains/domain"

export const pagesUiTree = {
  id: "01a071d1-5cdf-7e9c-bb2d-2903d6f0dc18",
  pageTypeSlug: "domain",
  slug: "pages-ui-tree",
  definition: "pages held under one another",
  partSlugs: ["module/parent-child-tree"],
} as const satisfies Domain
