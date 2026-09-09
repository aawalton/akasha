import type { Domain } from "akasha/domains/domain.page-type.ts"

export const pagesUiReorderVerbs = {
  id: "01a071d1-41ad-7a7c-a189-9c75005c96c3",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "pages-ui-reorder-verbs",
  definition: "a named act putting pages in order",
  parts: ["module/reorder-verb-registry"],
} as const satisfies Domain
