import type { SelectProperty } from "@akasha/pages-system/select-property"

export const accountType = {
  id: "01a0680a-1a00-7004-8e19-5b2c7d4e1105",
  pageTypeSlug: "select-property",
  slug: "account-type",
  propertySlug: "account-type",
  definition: "the sort of balance an account holds",
  values: ["depository", "brokerage", "credit", "loan", "real_estate"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The sorts are Monarch's own words rather than words chosen here.",
    },
    {
      invariantKind: "departure",
      statement: "A sort Monarch spells with an underscore is kept as Monarch spells it.",
    },
  ],
} as const satisfies SelectProperty

export type AccountType = (typeof accountType.values)[number]
