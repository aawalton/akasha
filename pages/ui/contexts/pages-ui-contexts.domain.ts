import type { Domain } from "@akasha/domains/domain"

export const pagesUiContexts = {
  id: "01a071cf-5cb5-7515-985b-9a9999073b99",
  pageTypeSlug: "domain",
  slug: "pages-ui-contexts",
  definition: "a value a React tree carries down",
  partSlugs: ["module/page-resolver-context", "module/relation-picker-context"],
} as const satisfies Domain
