import type { SelectProperty } from "@akasha/pages-system/select-property"

export const matchKey = {
  id: "01a0680c-3c00-7000-9b28-4e7a1d5c3101",
  pageTypeSlug: "select-property",
  slug: "match-key",
  propertySlug: "match-key",
  definition: "what about a transaction a clause tests",
  values: ["merchant", "sign", "account", "amount", "month", "date"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A merchant is read through the merchant vocabulary rather than off the row.",
    },
    {
      invariantKind: "departure",
      statement: "A sign is `positive` where money came in and `negative` where it went out.",
    },
    {
      invariantKind: "departure",
      statement: "An account is tested by the last four digits its slug ends in.",
    },
  ],
} as const satisfies SelectProperty

export type MatchKey = (typeof matchKey.values)[number]
