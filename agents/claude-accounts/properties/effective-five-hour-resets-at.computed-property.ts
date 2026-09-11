import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export const effectiveFiveHourResetsAt = {
  id: "01a0916c-9192-72e8-ab13-1e5f620a30ed",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "effective-five-hour-resets-at",
  propertySlug: "effective-five-hour-resets-at",
  definition: "when the five-hour allowance comes back, a spent week holding that back",
  holds: "instant",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account that has spent its seven-day window has no five-hour reset.",
    },
    {
      invariantKind: "departure",
      statement:
        "The reset is worked out from the effective seven-day usage rather than the stated percent.",
    },
    {
      invariantKind: "departure",
      statement: "An account whose subscription is withdrawn has no five-hour reset.",
    },
    {
      invariantKind: "absence",
      statement:
        "No code outside the five-hour reset module works out whether a reset is held back.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
