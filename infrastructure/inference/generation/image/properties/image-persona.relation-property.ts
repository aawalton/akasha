import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const imagePersona = {
  id: "01a0c5f0-5590-72e4-b3dc-065c29bd351c",
  type: "page-type/relation-property",
  slug: "image-persona",
  propertySlug: "persona",
  definition: "a picture's persona",
  targetPageType: "page-type/persona",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture of no persona states nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which of her pictures anchors, covers or hangs a persona is said on her page rather than here.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
