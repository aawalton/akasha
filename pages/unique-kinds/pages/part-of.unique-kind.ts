import type { UniqueKind } from "../unique-kind.page-type.ts"

export const partOf = {
  id: "01a06e67-b235-7f0c-bf4b-da0ea1868950",
  pageTypeSlug: "unique-kind",
  slug: "part-of",
  definition: "the value is unique among the pages part of one collection",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page part of more than one collection is filed under each of them.",
    },
    {
      invariantKind: "departure",
      statement: "The scope a page is filed under is the slug of the collection it is part of.",
    },
    {
      invariantKind: "absence",
      statement: "A page part of no collection is filed under no scope of this reach.",
    },
  ],
} as const satisfies UniqueKind
