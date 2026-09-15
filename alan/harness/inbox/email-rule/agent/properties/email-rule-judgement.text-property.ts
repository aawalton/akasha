import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const emailRuleJudgement = {
  id: "01a06863-4147-764f-8400-158d7917527a",
  type: "page-type/text-property",
  slug: "email-rule-judgement",
  propertySlug: "judgement",
  definition: "what an agent reaching a rule's mail is told to do with it",
  maxLength: 500,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A judgement opens with the act.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The words after the act are why that act is worth an agent.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
