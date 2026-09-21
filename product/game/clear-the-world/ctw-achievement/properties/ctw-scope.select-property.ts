import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const ctwScope = {
  id: "01a0c63f-006b-7e9a-bad2-480170e60eb7",
  type: "page-type/select-property",
  slug: "ctw-scope",
  propertySlug: "scope",
  definition: "whose count an achievement's metric is read from",
  values: ["global", "team", "profile"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A global scope reads the count every player together has reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A team scope reads the count one team has reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A profile scope reads the count one player has reached.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
