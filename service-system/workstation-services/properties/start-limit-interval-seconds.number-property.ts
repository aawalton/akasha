import type { NumberProperty } from "@akasha/pages-system/number-property"

export type StartLimitIntervalSeconds = number

export const startLimitIntervalSeconds = {
  id: "01a06738-9f12-7438-a51b-8c1408e6e9b7",
  pageTypeSlug: "number-property",
  slug: "start-limit-interval-seconds",
  propertySlug: "start-limit-interval-seconds",
  definition: "the window a unit's repeated starts are counted over",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A unit starting too often inside the window is left stopped.",
    },
  ],
} as const satisfies NumberProperty
