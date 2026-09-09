import type { UniqueKind } from "../unique-kind.page-type.ts"

export const pageProperty = {
  id: "01a0814f-68bb-7000-878e-605b3d7dec8b",
  pageTypeSlug: "unique-kind",
  slug: "page-property",
  definition: "the value is unique among the pages with one value of a property",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The property scoping the value is named under `uniqueProperty`.",
    },
    {
      invariantKind: "departure",
      statement: "That property is declared on the same page type, is required, and has one value.",
    },
    {
      invariantKind: "departure",
      statement: "The scope a page is filed under is the value that property has.",
    },
  ],
} as const satisfies UniqueKind
