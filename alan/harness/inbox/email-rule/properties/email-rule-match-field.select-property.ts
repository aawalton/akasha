import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const emailRuleMatchField = {
  id: "01a06860-549f-7cea-a615-3d15b6c3ddce",
  type: "page-type/select-property",
  slug: "email-rule-match-field",
  propertySlug: "field",
  definition: "the part of an email a condition compares with the values of the condition",
  values: ["from", "to", "subject", "list"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A field is named as the mail has that field rather than as its own page is slugged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every field here has text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every field takes the same comparisons.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the mail offers sits here whether or not a rule names that field yet.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:45:38.719Z",
  updatedAt: "2026-10-30T15:48:02.196Z",
} as const satisfies SelectProperty
