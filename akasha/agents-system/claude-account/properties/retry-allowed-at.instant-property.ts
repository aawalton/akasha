import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type RetryAllowedAt = string

export const retryAllowedAt = {
  id: "01a054d8-1d39-7bdf-8472-b3d6b9b59e9f",
  pageTypeSlug: "instant-property",
  slug: "retry-allowed-at",
  propertySlug: "retry-allowed-at",
  definition: "when the account may be called again after a refusal",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An upstream `retry-after` header states a length and is added to now to reach this instant.",
    },
  ],
} as const satisfies InstantProperty
