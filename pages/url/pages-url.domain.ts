import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const pagesUrl = {
  id: "01a05c13-a25f-72e2-bc3a-a48eec764e2f",
  type: "domain",
  slug: "pages-url",
  definition: "the addresses a browser reaches pages at, and the ones a reader may be sent to",

  parts: [
    "module/cover-url",
    "module/page-display-mode",
    "module/page-href",
    "module/page-listing-href",
    "module/page-type-slug",
    "module/safe-target",
  ],
} as const satisfies Domain
