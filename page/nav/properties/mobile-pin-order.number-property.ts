import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const mobilePinOrder = {
  id: "01a0680e-5e00-7003-a748-2c9f6b3e5104",
  type: "page-type/number-property",
  slug: "mobile-pin-order",
  propertySlug: "mobile-pin-order",
  definition: "where a nav item sits among the few a phone pins",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav item stating nothing is not pinned.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:16:07.168Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies NumberProperty
