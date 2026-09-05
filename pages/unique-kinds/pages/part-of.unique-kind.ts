import type { UniqueKind } from "../unique-kind.page-type.ts"

export const partOf = {
  id: "01a06e67-b235-7f0c-bf4b-da0ea1868950",
  pageTypeSlug: "unique-kind",
  slug: "part-of",
  definition: "the value is unique among the pages one page is made of",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is part of what names it under `part-slugs`.",
    },
    {
      invariantKind: "departure",
      statement: "A collection is part of what it names under `part-of-slugs`.",
    },
    {
      invariantKind: "departure",
      statement: "A page part of more than one page is filed under each of them.",
    },
    {
      invariantKind: "departure",
      statement: "The scope a page is filed under is the slug of the page it is part of.",
    },
    {
      invariantKind: "absence",
      statement: "A page part of nothing is filed under no scope of this reach.",
    },
  ],
} as const satisfies UniqueKind
