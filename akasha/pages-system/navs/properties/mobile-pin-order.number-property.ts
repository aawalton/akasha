import type { NumberProperty } from "@akasha/pages-system/number-property"

export type MobilePinOrder = number

export const mobilePinOrder = {
  id: "01a0680e-5e00-7003-a748-2c9f6b3e5104",
  pageTypeSlug: "number-property",
  slug: "mobile-pin-order",
  propertySlug: "mobile-pin-order",
  definition: "where a nav item sits among the few a phone pins",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A nav item stating nothing is not pinned.",
    },
  ],
} as const satisfies NumberProperty
