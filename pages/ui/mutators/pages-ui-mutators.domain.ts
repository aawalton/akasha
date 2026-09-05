import type { Domain } from "@akasha/domains/domain"

export const pagesUiMutators = {
  id: "01a071d0-fbc9-77b5-bc90-c1df2358997e",
  pageTypeSlug: "domain",
  slug: "pages-ui-mutators",
  definition: "the callbacks a view changes through",
  partSlugs: ["module/view-callbacks"],
} as const satisfies Domain
