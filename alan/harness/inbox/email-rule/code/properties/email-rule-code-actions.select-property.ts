import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const emailRuleCodeActions = {
  id: "01a06860-54a0-7cf6-aa4f-d2130e8c5b06",
  type: "page-type/select-property",
  slug: "email-rule-code-actions",
  propertySlug: "actions",
  definition: "what is done with mail a rule matches, beyond filing it and forwarding it",
  values: ["notify", "unsubscribe"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An action sits beside the filing rather than in place of that filing.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
