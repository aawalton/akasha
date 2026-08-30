import type { InstantProperty } from "../../../pages-system/instant-property/instant-property.page-type.ts"

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
      statement: "This holds the moment the wait ends rather than how long the wait is.",
    },
    {
      invariantKind: "departure",
      statement:
        "An upstream `retry-after` header states a length and is added to now to reach this.",
    },
  ],
} as const satisfies InstantProperty
