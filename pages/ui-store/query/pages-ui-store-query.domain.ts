import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const pagesUiStoreQuery = {
  id: "01a071cc-086c-740f-affb-d4471f64884e",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "pages-ui-store-query",
  definition: "a view read as a query the store runs",
  parts: [
    "module/condition-eval",
    "module/condition-expr",
    "module/id-suffix-pipeline",
    "module/regular-pipeline",
    "module/sort-resolve",
    "module/view-match",
    "module/view-pipeline",
    "module/view-target-slugs",
  ],
} as const satisfies Domain
