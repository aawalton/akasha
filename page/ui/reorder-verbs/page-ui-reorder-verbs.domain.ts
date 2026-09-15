import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiReorderVerbs = {
  id: "01a071d1-41ad-7a7c-a189-9c75005c96c3",
  type: "domain",
  slug: "page-ui-reorder-verbs",
  definition: "a named act putting pages in order",
  parts: ["module/reorder-verb-registry"],
} as const satisfies Domain
