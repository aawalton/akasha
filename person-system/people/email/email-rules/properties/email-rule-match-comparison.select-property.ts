import type { SelectProperty } from "@akasha/pages-system/select-property"

export const emailRuleMatchComparison = {
  id: "01a06860-549f-73bf-9cb1-d6bcba6417f3",
  pageTypeSlug: "select-property",
  slug: "email-rule-match-comparison",
  propertySlug: "comparison",
  definition: "how a clause weighs a piece of mail against what the clause holds",
  values: [
    "is",
    "is-not",
    "starts-with",
    "does-not-start-with",
    "ends-with",
    "does-not-end-with",
    "contains",
    "does-not-contain",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A clause holding several values passes where any one of them matches.",
    },
    {
      invariantKind: "departure",
      statement: "Each comparison stands beside its negation rather than beside a flag.",
    },
    {
      invariantKind: "departure",
      statement: "A comparison a text field takes stands here whether or not a rule names it yet.",
    },
  ],
} as const satisfies SelectProperty

export type EmailRuleMatchComparison = (typeof emailRuleMatchComparison.values)[number]
