import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeBeMyBaby = {
  id: "01a0a6c5-2e2c-745d-9087-ea8221b89405",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-be-my-baby",
  ownLength: 3.61755,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0fonaf88IEDQM309zmU80L",
      externalLink: "https://open.spotify.com/track/0fonaf88IEDQM309zmU80L",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Be My Baby",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "2LZDXcxJWgsJfKXZv9a5eG", artistName: "Cashmere Cat" },
  ],
  trackKey: "bemybaby|2LZDXcxJWgsJfKXZv9a5eG,66CXWjxzNUsdJxJ2JdwvnR|217053",
  song: "song/ariana-grande-be-my-baby",
} as const satisfies Track
