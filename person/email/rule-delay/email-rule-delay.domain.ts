import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const emailRuleDelay = {
  id: "01a0675b-16e7-7b45-9ae7-d696d37fe279",
  type: "page-type/domain",
  slug: "email-rule-delay",
  definition: "how long after a piece of mail arrives before an email rule acts on it",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A delay is measured from when the mail arrived rather than from when the rule was consulted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The delay postpones the acting rather than the matching.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A delay is on the rule rather than on an action.",
    },
  ],
} as const satisfies Domain
