import type { UniquenessKind } from "../uniqueness-kind.page-type.ts"

export const pageType = {
  id: "01a04edd-897d-7be9-a32c-a427a14dc3c1",
  pageTypeSlug: "uniqueness-kind",
  slug: "page-type",
  definition: "the value is unique among the pages of its page type",
} as const satisfies UniquenessKind
