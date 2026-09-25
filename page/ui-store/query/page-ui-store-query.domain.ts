import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiStoreQuery = {
  id: "01a071cc-086c-740f-affb-d4471f64884e",
  type: "page-type/domain",
  slug: "page-ui-store-query",
  definition: "how a browser finds the pages a view shows",
  parts: [
    "module/condition-eval",
    "module/condition-expr",
    "module/id-suffix-pipeline",
    "module/regular-pipeline",
    "module/related-pipeline",
    "module/sort-resolve",
    "module/view-match",
    "module/view-pipeline",
    "module/view-target-slugs",
  ],
} as const satisfies Domain
