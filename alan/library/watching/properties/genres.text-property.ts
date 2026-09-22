import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const genres = {
  id: "01a06599-ee09-7006-a413-b286ec4d7f8d",
  type: "page-type/text-property",
  slug: "genres",
  propertySlug: "genres",
  definition: "a kind the provider gives a collection",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A genre is the provider's classing rather than the person's tag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A genre is written as the provider writes that genre.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
