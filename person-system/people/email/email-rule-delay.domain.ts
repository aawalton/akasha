import type { Domain } from "../../../domains/domains/domain.page-type.ts"

export const emailRuleDelay = {
  id: "01a0675b-16e7-7b45-9ae7-d696d37fe279",
  pageTypeSlug: "domain",
  slug: "email-rule-delay",
  definition: "how long after a piece of mail arrives before an email rule acts on it",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A delay is measured from when the mail arrived rather than from when the rule was consulted.",
    },
    {
      invariantKind: "departure",
      statement: "A rule takes the mail when it matches, and the delay postpones only the acting.",
    },
    {
      invariantKind: "departure",
      statement: "A delay is on the rule rather than on one of its actions.",
    },
  ],
} as const satisfies Domain
