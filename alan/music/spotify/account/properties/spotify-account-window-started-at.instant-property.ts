import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const spotifyAccountWindowStartedAt = {
  id: "01a0b6db-acc0-74d0-be25-cbfa5381e2e8",
  type: "page-type/instant-property",
  slug: "spotify-account-window-started-at",
  propertySlug: "window-started-at",
  definition: "when the window the calls are counted over opened",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A call made once the window is older than its length opens a new window.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
