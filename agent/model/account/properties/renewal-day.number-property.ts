import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const renewalDay = {
  id: "01a054d8-1d39-732e-b569-0535e7c91e43",
  type: "page-type/number-property",
  slug: "renewal-day",
  propertySlug: "renewal-day",
  definition: "the day of the month the account's subscription renews",
  max: 31,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day past the end of a short month renews on that month's last day.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
