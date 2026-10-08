import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const sectionOf = {
  id: "01a08189-6150-743e-b860-1baeba37171d",
  type: "page-type/relation-property",
  slug: "section-of",
  propertySlug: "section-of",
  definition: "a section's collection",
  targetPageType: "page-type/collection",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A section names one collection here and the collections edge names the rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section's slug is unique among the sections naming the same collection here.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-08T15:00:59.344Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies RelationProperty
