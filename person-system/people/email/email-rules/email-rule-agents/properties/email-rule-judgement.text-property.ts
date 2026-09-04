import type { TextProperty } from "@akasha/pages-system/text-property"

export type EmailRuleJudgement = string

export const emailRuleJudgement = {
  id: "01a06863-4147-764f-8400-158d7917527a",
  pageTypeSlug: "text-property",
  slug: "email-rule-judgement",
  propertySlug: "judgement",
  definition: "what an agent reaching a rule's mail is told to do with it",
  max: 500,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A judgement opens with the act, and what follows is why it is worth an agent.",
    },
  ],
} as const satisfies TextProperty
