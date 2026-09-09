import type { TextProperty } from "@akasha/pages/text-property"

export type EmailRuleMatchValues = string

export const emailRuleMatchValues = {
  id: "01a06860-549f-7515-8899-efaf83c51fbe",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "email-rule-match-values",
  propertySlug: "values",
  definition: "what a clause has to weigh a piece of mail against",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is written as the mail has that value rather than as a title.",
    },
  ],
} as const satisfies TextProperty
