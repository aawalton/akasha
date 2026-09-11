import type { AccessKind } from "akasha/persons/access-kinds/access-kind.page-type.types.ts"

export const pageType = {
  id: "01a0542d-4b9d-7680-b74a-818e4ddb54ff",
  type: "access-kind",
  slug: "page-type",
  definition: "a kind of page, and every page that is one",
} as const satisfies AccessKind
