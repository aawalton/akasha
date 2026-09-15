import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaTheVeryBestOfEnyaDeluxeEditionMyMyTimeFlies = {
  id: "01a0a5b0-291d-7c64-8116-d3db11d28bf0",
  type: "track",
  slug: "enya-the-very-best-of-enya-deluxe-edition-my-my-time-flies",
  ownLength: 3.0486666666666666,
  ownProgress: 0,
  partOfCollections: ["release/enya-the-very-best-of-enya-deluxe-edition"],
  position: 19,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6EPyj7t9gD71FxXxeoltfs",
      externalLink: "https://open.spotify.com/track/6EPyj7t9gD71FxXxeoltfs",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "My! My! Time Flies!",
} as const satisfies Track
