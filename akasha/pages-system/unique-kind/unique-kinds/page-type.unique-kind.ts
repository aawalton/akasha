import type { UniqueKind } from "../unique-kind.page-type.ts"

export const pageType = {
  id: "01a04edd-897d-7be9-a32c-a427a14dc3c1",
  pageTypeSlug: "unique-kind",
  slug: "page-type",
  definition: "the value is unique among the pages of its page type",
} as const satisfies UniqueKind
