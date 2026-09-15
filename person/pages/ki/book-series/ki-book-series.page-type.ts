import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const kiBookSeries = {
  id: "01a06825-d0ec-7bfd-b89f-ecf2d7fbbaad",
  type: "page-type/page-type",
  slug: "ki-book-series",
  definition: "the books Ki keeps that have one story in order",
  extends: ["page-type/ki-collection-template"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A series of Ki's has nothing of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A series of Ki's names no book.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The books a series of Ki's holds are the books naming that series.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
