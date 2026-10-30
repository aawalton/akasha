import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const spotifyAccountRetryAllowedAt = {
  id: "01a0b6db-f79d-7e70-8fc5-84367703028d",
  type: "page-type/instant-property",
  slug: "spotify-account-retry-allowed-at",
  propertySlug: "retry-allowed-at",
  definition: "the instant Spotify takes calls from the account again",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A `retry-after` header states a length in seconds and is added to now to reach this instant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every process refuses a call until this instant rather than spending one to learn of it.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-18T23:31:04.221Z",
  updatedAt: "2026-10-30T16:31:28.707Z",
} as const satisfies InstantProperty
