import type { TextProperty } from "@akasha/pages-system/text-property"

export type EmailRuleMatchValues = string

export const emailRuleMatchValues = {
  id: "01a06860-549f-7515-8899-efaf83c51fbe",
  pageTypeSlug: "text-property",
  slug: "email-rule-match-values",
  propertySlug: "values",
  definition: "what a clause holds to weigh a piece of mail against",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is written as the mail carries it rather than as a title.",
    },
  ],
} as const satisfies TextProperty
