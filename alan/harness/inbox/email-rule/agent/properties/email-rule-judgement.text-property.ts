import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const emailRuleJudgement = {
  id: "01a06863-4147-764f-8400-158d7917527a",
  type: "page-type/text-property",
  slug: "email-rule-judgement",
  propertySlug: "judgement",
  definition: "what an email rule asks an agent to do with each email that matches the rule",
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
  updatedAt: "2026-10-30T15:38:59.376Z",
} as const satisfies TextProperty
