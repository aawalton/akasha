import type { Domain } from "@akasha/domains/domain"

export const pagesCoreViewState = {
  id: "01a071cb-7212-7f03-b59e-099c65e92766",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "pages-core-view-state",
  definition: "what a view has between one change and the next",
  parts: ["module/reducers", "module/view-state-change"],
} as const satisfies Domain
