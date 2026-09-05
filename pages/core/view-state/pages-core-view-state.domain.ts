import type { Domain } from "@akasha/domains/domain"

export const pagesCoreViewState = {
  id: "01a071cb-7212-7f03-b59e-099c65e92766",
  pageTypeSlug: "domain",
  slug: "pages-core-view-state",
  definition: "what a view holds between one change and the next",
  partSlugs: ["module/reducers", "module/view-state-change"],
} as const satisfies Domain
