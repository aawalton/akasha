import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type RenewalDay = number

export const renewalDay = {
  id: "01a054d8-1d39-732e-b569-0535e7c91e43",
  pageTypeSlug: "number-property",
  slug: "renewal-day",
  propertySlug: "renewal-day",
  definition: "the day of the month the account's subscription renews on",
  max: 31,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day past the end of a short month renews on that month's last day.",
    },
  ],
} as const satisfies NumberProperty
