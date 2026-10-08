import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const emailRuleJudgement = {
  id: "01a06863-4147-764f-8400-158d7917527a",
  type: "page-type/text-property",
  slug: "email-rule-judgement",
  propertySlug: "judgement",
  definition: "what an agent reaching a rule's mail is told to do with it",
  maxLength: 500,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A judgement opens with the act.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words after the act are why that act is worth an agent.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:48:50.375Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
