import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const accountType = {
  id: "01a0680a-1a00-7004-8e19-5b2c7d4e1105",
  type: "page-type/select-property",
  slug: "account-type",
  propertySlug: "account-type",
  definition: "the kind Monarch gives a Monarch account",
  values: ["depository", "brokerage", "credit", "loan", "real_estate"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sorts are Monarch's own words rather than words chosen here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sort Monarch spells with an underscore is kept as Monarch spells that sort.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:11:27.616Z",
  updatedAt: "2026-10-30T15:43:34.139Z",
} as const satisfies SelectProperty
