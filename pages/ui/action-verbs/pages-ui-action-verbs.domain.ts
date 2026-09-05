import type { Domain } from "@akasha/domains/domain"

export const pagesUiActionVerbs = {
  id: "01a071ce-d674-7d9d-a3d0-a213b0a22dcf",
  pageTypeSlug: "domain",
  slug: "pages-ui-action-verbs",
  definition: "a named act a page offers",
  partSlugs: ["module/action-verb-registry"],
} as const satisfies Domain
