import type { Domain } from "@akasha/domains/domain"

export const pagesUiCoverClick = {
  id: "01a071cf-77a2-79dd-9156-cf09563bb150",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "pages-ui-cover-click",
  definition: "a click on a page's cover",
  parts: ["module/cover-click-registry", "module/cover-mask-registry"],
} as const satisfies Domain
