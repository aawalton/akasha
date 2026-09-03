import type { SelectProperty } from "@akasha/pages-system/select-property"

export const emailRuleCodeActions = {
  id: "01a06860-54a0-7cf6-aa4f-d2130e8c5b06",
  pageTypeSlug: "select-property",
  slug: "email-rule-code-actions",
  propertySlug: "actions",
  definition: "what is done with mail a rule matches, beyond filing it and forwarding it",
  values: ["notify", "unsubscribe"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An action stands beside the filing rather than in place of it.",
    },
  ],
} as const satisfies SelectProperty

export type EmailRuleCodeActions = (typeof emailRuleCodeActions.values)[number]
