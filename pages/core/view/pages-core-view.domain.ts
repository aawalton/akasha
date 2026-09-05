import type { Domain } from "@akasha/domains/domain"

export const pagesCoreView = {
  id: "01a071cb-580b-710d-a9ae-c371fe8df6c3",
  pageTypeSlug: "domain",
  slug: "pages-core-view",
  definition: "what a view makes of the rows handed to it",
  partSlugs: [
    "module/apply-filters",
    "module/apply-grouping",
    "module/apply-grouping-shared",
    "module/apply-grouping-sort",
    "module/apply-search",
    "module/apply-sorts",
    "module/apply-view",
    "module/calendar-date-to-value",
    "module/calendar-grid",
    "module/expand-date-mentions",
    "module/format-smart-date",
    "module/gallery",
    "module/generate-filter-dimensions",
    "module/generate-sort-options",
    "module/group-granularity",
    "module/group-key-to-value",
    "module/notes",
    "module/page-query-times",
    "module/sort-accessors",
  ],
} as const satisfies Domain
