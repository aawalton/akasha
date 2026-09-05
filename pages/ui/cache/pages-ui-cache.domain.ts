import type { Domain } from "@akasha/domains/domain"

export const pagesUiCache = {
  id: "01a071cf-25b5-79d7-8f2c-eabab6748229",
  pageTypeSlug: "domain",
  slug: "pages-ui-cache",
  definition: "an answer held from before",
  partSlugs: [
    "module/boot-gate",
    "module/tanstack-live",
    "module/use-core-definitions-ready",
    "module/use-query",
    "module/use-view-query",
  ],
} as const satisfies Domain
