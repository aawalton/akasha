import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const imageSubjects = {
  id: "01a0dead-577a-753e-aa2c-d03331ad77fd",
  type: "page-type/text-property",
  slug: "image-subjects",
  propertySlug: "subjects",
  definition: "the people a picture shows, one letter each for their gender",
  maxLength: 12,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each person a picture shows is one letter, F for a woman and M for a man.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every F is written before every M, so two women and a man is FFM.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture that shows no person states nothing here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
