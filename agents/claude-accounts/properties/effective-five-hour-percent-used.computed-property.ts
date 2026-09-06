import type { ComputedProperty } from "@akasha/pages/computed-property"

export type EffectiveFiveHourPercentUsed = number

export const effectiveFiveHourPercentUsed = {
  id: "01a07659-1795-7ecf-b6af-a6a32cda7a73",
  pageTypeSlug: "computed-property",
  slug: "effective-five-hour-percent-used",
  propertySlug: "effective-five-hour-percent-used",
  definition:
    "how much of the five-hour allowance is spent, a withdrawn or spent week counting as all of it",
  holds: "number",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account whose subscription is withdrawn has spent the whole of the window.",
    },
    {
      invariantKind: "departure",
      statement: "An account that has spent its seven-day window has spent its five-hour one.",
    },
    {
      invariantKind: "departure",
      statement: "An account carrying no percent is worked out as no reading rather than as zero.",
    },
    {
      invariantKind: "departure",
      statement: "A percent stated as text is read as the number that percent spells.",
    },
  ],
} as const satisfies ComputedProperty
