import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const pageUiCoverClick = {
  id: "01a071cf-77a2-79dd-9156-cf09563bb150",
  type: "domain",
  slug: "page-ui-cover-click",
  definition: "a click on a page's cover",
  parts: ["module/cover-click-registry", "module/cover-mask-registry"],
} as const satisfies Domain
