import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const registrationAccount = {
  id: "01a05397-7f9b-783b-b5ec-f0b163957fdf",
  type: "page-type/relation-property",
  slug: "registration-account",
  propertySlug: "registration-account",
  definition: "the model account an agent in a seat uses",
  targetPageType: "page-type/model-account",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A supervisor writes this value as a relation and hands it on as the model account's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This property is a relation to a model account.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T16:53:52.667Z",
  updatedAt: "2026-09-25T18:08:11.000Z",
} as const satisfies RelationProperty
