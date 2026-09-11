import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const sectionOf = {
  id: "01a08189-6150-743e-b860-1baeba37171d",
  type: "relation-property",
  slug: "section-of",
  propertySlug: "section-of",
  definition: "the collection a section is an instalment of",
  targetPageType: "page-type/collection",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A section names one collection here and the collections edge names the rest.",
    },
    {
      invariantKind: "departure",
      statement: "A section's slug is unique among the sections naming the same collection here.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
