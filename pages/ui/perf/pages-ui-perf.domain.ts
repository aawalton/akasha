import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const pagesUiPerf = {
  id: "01a071d1-2367-7ad6-9120-93d669869ca2",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "pages-ui-perf",
  definition: "how long drawing a page takes",
  parts: ["module/page-card-perf"],
} as const satisfies Domain
