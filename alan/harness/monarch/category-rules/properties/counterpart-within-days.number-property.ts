import type { NumberProperty } from "@akasha/pages/number-property"

export type CounterpartWithinDays = number

export const counterpartWithinDays = {
  id: "01a0680c-3c00-7004-9a36-5b8e2c7f3105",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "counterpart-within-days",
  propertySlug: "counterpart-within-days",
  definition: "how far either way a rule looks for the transaction's other leg",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A counterpart is a requirement a rule makes rather than a clause of that rule.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule requiring a counterpart settles nothing where no transaction pairs uniquely.",
    },
    {
      invariantKind: "departure",
      statement: "A window is never widened to make a pair.",
    },
  ],
} as const satisfies NumberProperty
