import type { Domain } from "@akasha/domains/domain"

export const componentsViewEngine = {
  id: "01a071d3-819f-77d0-818b-e7da6441196a",
  pageTypeSlug: "domain",
  slug: "components-view-engine",
  definition: "the rows a view draws on screen",
  partSlugs: [
    "module/build-page-resolver",
    "module/generate-group-definitions",
    "module/use-page-view",
    "module/use-view-row-aggregates",
    "module/use-view-row-rollups",
    "module/view-row",
  ],
} as const satisfies Domain
