import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const subscriptionCanceled = {
  id: "01a0e2ed-9c52-7e56-b22d-42d0760946cd",
  type: "page-type/boolean-property",
  slug: "subscription-canceled",
  propertySlug: "subscription-canceled",
  definition: "whether a subscription is canceled",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A canceled subscription runs until the account's renewal day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An account whose subscription is withdrawn reads as withdrawn rather than canceled.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-27T12:53:38.002Z",
  updatedAt: "2026-10-19T18:51:43.544Z",
} as const satisfies BooleanProperty
