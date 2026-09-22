import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const messagesSent = {
  id: "01a082db-9816-7ab2-b6ed-8a897a78de90",
  type: "page-type/number-property",
  slug: "messages-sent",
  propertySlug: "sent",
  definition: "how many messages Alan wrote to a persona on a day",
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
} as const satisfies NumberProperty
