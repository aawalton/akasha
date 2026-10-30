import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const emailRuleCodeFiling = {
  id: "01a06860-549f-7088-a74f-de255a1b5b39",
  type: "page-type/select-property",
  slug: "email-rule-code-filing",
  propertySlug: "filing",
  definition: "whether an email rule removes each email that matches the rule from the inbox",
  values: ["archive", "skip"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Archiving and skipping exclude each other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Skipping is doing nothing to the mail rather than leaving the filing unstated.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:45:38.719Z",
  updatedAt: "2026-10-30T15:40:33.961Z",
} as const satisfies SelectProperty
