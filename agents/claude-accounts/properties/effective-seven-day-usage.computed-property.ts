import type { ComputedProperty } from "@akasha/pages/computed-property"

export type EffectiveSevenDayUsage = number

export const effectiveSevenDayUsage = {
  id: "01a07659-1796-79b2-9c53-f9a3eb5ed248",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "effective-seven-day-usage",
  propertySlug: "effective-seven-day-usage",
  definition:
    "how much of the seven-day allowance is spent, a withdrawn subscription counting as all of it",
  holds: "number",
  code: "ts",
  test: "ts",
  invariants: [
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
      statement: "No code outside the effective seven-day usage works out the seven-day spend.",
    },
  ],
} as const satisfies ComputedProperty
