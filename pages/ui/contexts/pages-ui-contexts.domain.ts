import type { Domain } from "akasha/domains/domain.page-type.ts"

export const pagesUiContexts = {
  id: "01a071cf-5cb5-7515-985b-9a9999073b99",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "pages-ui-contexts",
  definition: "a value a React tree carries down",
  parts: ["module/page-resolver-context", "module/relation-picker-context"],
} as const satisfies Domain
