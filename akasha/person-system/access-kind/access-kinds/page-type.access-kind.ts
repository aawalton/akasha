import type { AccessKind } from "../access-kind.page-type.ts"

export const pageType = {
  id: "01a0542d-4b9d-7680-b74a-818e4ddb54ff",
  pageTypeSlug: "access-kind",
  slug: "page-type",
  definition: "a kind of page, and every page standing as one",
} as const satisfies AccessKind
