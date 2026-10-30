import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const counterpartWithinDays = {
  id: "01a0680c-3c00-7004-9a36-5b8e2c7f3105",
  type: "page-type/number-property",
  slug: "counterpart-within-days",
  propertySlug: "counterpart-within-days",
  definition:
    "the number of days a category rule searches on each side of a transaction for a second transaction",
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
  updatedAt: "2026-10-30T15:43:47.843Z",
} as const satisfies NumberProperty
