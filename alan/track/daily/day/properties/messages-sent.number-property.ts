import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const messagesSent = {
  id: "01a082db-9816-7ab2-b6ed-8a897a78de90",
  type: "page-type/number-property",
  slug: "messages-sent",
  propertySlug: "sent",
  definition: "the number of messages Alan sends to a persona in a day",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message Alan wrote is counted where the message left Alan.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A message a persona wrote back is counted nowhere.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-08T21:10:24.534Z",
  updatedAt: "2026-10-30T16:44:16.465Z",
} as const satisfies NumberProperty
