import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const cardVocabulary = {
  id: "01a0c490-93a4-7348-934e-965d459c9515",
  type: "page-type/text-property",
  slug: "card-vocabulary",
  propertySlug: "card-vocabulary",
  definition: "a word the system window announces to a player of this game",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game announces only the words it names here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
