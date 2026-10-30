import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const spotifyAccountWindowStartedAt = {
  id: "01a0b6db-acc0-74d0-be25-cbfa5381e2e8",
  type: "page-type/instant-property",
  slug: "spotify-account-window-started-at",
  propertySlug: "window-started-at",
  definition: "the instant the span of time that calls are counted over starts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A call made once the window is older than its length opens a new window.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-18T23:30:45.056Z",
  updatedAt: "2026-10-30T16:31:44.641Z",
} as const satisfies InstantProperty
