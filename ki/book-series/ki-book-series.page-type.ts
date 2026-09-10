import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const kiBookSeries = {
  id: "01a06825-d0ec-7bfd-b89f-ecf2d7fbbaad",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "ki-book-series",
  definition: "the books Ki keeps that have one story in order",
  pluralSlug: "ki-book-series",
  extends: ["page-type/ki-collection-template"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A series of Ki's has nothing of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A series of Ki's names no book.",
    },
    {
      invariantKind: "departure",
      statement: "The books a series of Ki's holds are the books naming that series.",
    },
  ],
  types: "ts",
} as const satisfies PageType
