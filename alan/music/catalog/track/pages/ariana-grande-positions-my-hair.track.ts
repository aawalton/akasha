import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsMyHair = {
  id: "01a0a6c5-2203-7063-bf39-ada61259c471",
  type: "page-type/track",
  slug: "ariana-grande-positions-my-hair",
  ownLength: 2.6406,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6u7gmPOz7pzzaeR9xSBpsR",
      externalLink: "https://open.spotify.com/track/6u7gmPOz7pzzaeR9xSBpsR",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "my hair",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "myhair|66CXWjxzNUsdJxJ2JdwvnR|158436",
} as const satisfies Track
