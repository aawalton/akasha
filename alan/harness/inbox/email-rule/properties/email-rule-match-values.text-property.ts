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
  createdAt: "2026-09-03T17:45:38.719Z",
  updatedAt: "2026-09-22T14:07:21.000Z",
} as const satisfies TextProperty
