import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const emailRuleCodeActions = {
  id: "01a06860-54a0-7cf6-aa4f-d2130e8c5b06",
  type: "page-type/select-property",
  slug: "email-rule-code-actions",
  propertySlug: "actions",
  definition:
    "what an email rule does with each email that matches the rule besides where the email goes",
  values: ["notify", "unsubscribe"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An action sits beside the filing rather than in place of that filing.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:45:38.720Z",
  updatedAt: "2026-10-30T15:46:55.791Z",
} as const satisfies SelectProperty
