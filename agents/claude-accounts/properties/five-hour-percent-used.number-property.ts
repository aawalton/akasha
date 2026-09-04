import type { NumberProperty } from "@akasha/pages-system/number-property"

export type FiveHourPercentUsed = number

export const fiveHourPercentUsed = {
  id: "01a054d8-1d39-7bc9-bb38-636d44d7d1fb",
  pageTypeSlug: "number-property",
  slug: "five-hour-percent-used",
  propertySlug: "five-hour-percent-used",
  definition: "how much of the five-hour allowance is spent",
  max: 100,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account that has spent its seven-day window has spent its five-hour one.",
    },
  ],
} as const satisfies NumberProperty
