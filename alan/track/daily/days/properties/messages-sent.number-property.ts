import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const messagesSent = {
  id: "01a082db-9816-7ab2-b6ed-8a897a78de90",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "messages-sent",
  propertySlug: "sent",
  definition: "how many messages Alan wrote to one persona on one day",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message Alan wrote is counted where the message left Alan.",
    },
    {
      invariantKind: "absence",
      statement: "A message a persona wrote back is counted nowhere.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
