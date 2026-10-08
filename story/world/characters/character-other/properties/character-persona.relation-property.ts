import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const characterPersona = {
  id: "01a0de8a-32e1-74b8-8abf-107a1d0269a0",
  type: "page-type/relation-property",
  slug: "character-persona",
  propertySlug: "persona",
  definition: "the persona a character is",
  targetPageType: "page-type/persona",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character who is a persona names her here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character who is no persona names none.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-26T16:26:34.081Z",
  updatedAt: "2026-09-26T17:44:02.000Z",
} as const satisfies RelationProperty
