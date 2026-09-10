import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type EmailRuleJudgement = string

export const emailRuleJudgement = {
  id: "01a06863-4147-764f-8400-158d7917527a",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "email-rule-judgement",
  propertySlug: "judgement",
  definition: "what an agent reaching a rule's mail is told to do with it",
  maxLength: 500,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A judgement opens with the act.",
    },
    {
      invariantKind: "departure",
      statement: "The words after the act are why that act is worth an agent.",
    },
  ],
} as const satisfies TextProperty
