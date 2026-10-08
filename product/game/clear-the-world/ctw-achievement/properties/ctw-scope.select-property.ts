import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const ctwScope = {
  id: "01a0c63f-006b-7e9a-bad2-480170e60eb7",
  type: "page-type/select-property",
  slug: "ctw-scope",
  propertySlug: "scope",
  definition: "whose count an achievement's metric reads",
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
  createdAt: "2026-09-21T23:13:32.779Z",
  updatedAt: "2026-09-22T13:48:49.000Z",
} as const satisfies SelectProperty
