import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const revealedAs = {
  id: "01a0f1c4-51cf-7ebc-8f74-f8162bdf2b0c",
  type: "page-type/text-property",
  slug: "revealed-as",
  propertySlug: "revealed-as",
  definition: "the words a story has given a player for a metric it has not yet shown as a number",
  maxLength: 60,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A metric the story has shown only in words states those words here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A play screen draws these words in place of the metric's numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A metric whose numbers the story has shown states nothing here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
