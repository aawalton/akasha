import type { ComputedProperty } from "@akasha/pages/computed-property"

export type EffectiveFiveHourUsage = number

export const effectiveFiveHourUsage = {
  id: "01a07659-1795-7ecf-b6af-a6a32cda7a73",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "effective-five-hour-usage",
  propertySlug: "effective-five-hour-usage",
  definition:
    "how much of the five-hour allowance is spent, a withdrawn or spent week counting as all of it",
  holds: "number",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account that has spent its seven-day window has spent its five-hour window.",
    },
    {
      invariantKind: "departure",
      statement:
        "The five-hour usage is worked out from the effective seven-day usage rather than the stated percent.",
    },
    {
      invariantKind: "departure",
      statement: "An account whose subscription is withdrawn has spent the whole of the window.",
    },
    {
      invariantKind: "departure",
      statement: "An account with no percent is worked out as no reading rather than as zero.",
    },
    {
      invariantKind: "departure",
      statement: "A percent stated as text is read as the number that percent spells.",
    },
    {
      invariantKind: "absence",
      statement: "No code outside the effective five-hour usage works out the five-hour spend.",
    },
  ],
} as const satisfies ComputedProperty
