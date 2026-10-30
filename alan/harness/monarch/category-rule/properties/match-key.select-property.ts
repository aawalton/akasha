import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const matchKey = {
  id: "01a0680c-3c00-7000-9b28-4e7a1d5c3101",
  type: "page-type/select-property",
  slug: "match-key",
  propertySlug: "key",
  definition: "the part of a transaction a category rule looks at",
  values: ["merchant", "sign", "account", "amount", "month", "date"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A merchant is read through the merchant vocabulary rather than off the row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sign is `positive` where money came in and `negative` where money went out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account is tested by the last four digits its slug ends in.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:13:47.392Z",
  updatedAt: "2026-10-30T15:44:45.819Z",
} as const satisfies SelectProperty
