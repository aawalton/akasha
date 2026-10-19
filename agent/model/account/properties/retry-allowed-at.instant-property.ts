import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const retryAllowedAt = {
  id: "01a054d8-1d39-7bdf-8472-b3d6b9b59e9f",
  type: "page-type/instant-property",
  slug: "retry-allowed-at",
  propertySlug: "retry-allowed-at",
  definition: "when a seat can call a model account after a refusal",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An upstream `retry-after` header states a length and is added to now to reach this instant.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T22:44:04.537Z",
  updatedAt: "2026-10-19T18:49:33.632Z",
} as const satisfies InstantProperty
