import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUrl = {
  id: "01a05c13-a25f-72e2-bc3a-a48eec764e2f",
  type: "page-type/domain",
  slug: "page-url",
  definition: "the addresses a browser reaches pages at, and the ones a reader may be sent to",

  parts: [
    "module/page-display-mode",
    "module/page-href",
    "module/page-listing-href",
    "module/page-type-slug",
    "module/safe-target",
  ],
  createdAt: "2026-09-01T08:26:25.759Z",
  updatedAt: "2026-09-21T22:14:54.000Z",
} as const satisfies Domain
