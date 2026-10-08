import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const counterpartWithinDays = {
  id: "01a0680c-3c00-7004-9a36-5b8e2c7f3105",
  type: "page-type/number-property",
  slug: "counterpart-within-days",
  propertySlug: "counterpart-within-days",
  definition: "how far either way a rule looks for the transaction's other leg",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A counterpart is a requirement a rule makes rather than a clause of that rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule requiring a counterpart settles nothing where no transaction pairs uniquely.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window is never widened to make a pair.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:13:47.392Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies NumberProperty
