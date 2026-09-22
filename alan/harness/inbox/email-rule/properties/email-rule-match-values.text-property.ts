import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const emailRuleMatchValues = {
  id: "01a06860-549f-7515-8899-efaf83c51fbe",
  type: "page-type/text-property",
  slug: "email-rule-match-values",
  propertySlug: "values",
  definition: "the values against which a clause weighs a piece of mail",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is written as the mail has that value rather than as a title.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
