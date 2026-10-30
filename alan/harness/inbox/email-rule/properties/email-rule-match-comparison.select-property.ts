import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const emailRuleMatchComparison = {
  id: "01a06860-549f-73bf-9cb1-d6bcba6417f3",
  type: "page-type/select-property",
  slug: "email-rule-match-comparison",
  propertySlug: "comparison",
  definition: "how a condition compares a part of an email with the values of the condition",
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
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A clause with several values passes where a value matches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each comparison sits beside its negation rather than beside a flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A comparison a text field takes sits here whether or not a rule names that comparison yet.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:45:38.719Z",
  updatedAt: "2026-10-30T15:47:40.818Z",
} as const satisfies SelectProperty
