import type { ComputedProperty } from "@akasha/pages/computed-property"

export type EffectiveSevenDayPercentUsed = number

export const effectiveSevenDayPercentUsed = {
  id: "01a07659-1796-79b2-9c53-f9a3eb5ed248",
  pageTypeSlug: "computed-property",
  slug: "effective-seven-day-percent-used",
  propertySlug: "effective-seven-day-percent-used",
  definition:
    "how much of the seven-day allowance is spent, a withdrawn subscription counting as all of it",
  holds: "number",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account whose subscription is withdrawn has spent the whole of the window.",
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
