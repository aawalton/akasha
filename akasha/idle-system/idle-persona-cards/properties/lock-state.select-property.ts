import type { SelectProperty } from "@akasha/pages-system/select-property"

export const lockState = {
  id: "01a06596-f0d5-700b-af22-da0e38963974",
  pageTypeSlug: "select-property",
  slug: "lock-state",
  propertySlug: "lock-state",
  definition: "whether a card has been opened yet",
  values: ["locked", "unlocked"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked card is titled by three question marks rather than by its persona.",
    },
  ],
} as const satisfies SelectProperty

export type LockState = (typeof lockState.values)[number]
