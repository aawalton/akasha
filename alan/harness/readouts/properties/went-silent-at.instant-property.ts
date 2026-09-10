import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export const wentSilentAt = {
  id: "01a08caf-b3c1-73e9-9237-f5ea2af2731e",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "went-silent-at",
  propertySlug: "went-silent-at",
  definition: "when a readout began answering nothing where a number was asked of it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout whose last take answered a number carries nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "The first take to answer nothing writes this.",
    },
    {
      invariantKind: "departure",
      statement: "The takes after leave this as it is.",
    },
    {
      invariantKind: "departure",
      statement: "This is taken away by the take that answers a number again.",
    },
    {
      invariantKind: "departure",
      statement: "A watch that has taken a readout no time yet reads it as answering nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Answering nothing is a fact about a readout rather than a fault of its watch.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
