import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineSlightlyDeluxeIWishIHatedYou = {
  id: "01a0a6c5-19c7-7347-a1e0-893219e56010",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-slightly-deluxe-i-wish-i-hated-you",
  ownLength: 2.56055,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine-slightly-deluxe"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6UUmCyNYOBq4fxfbN1sVrK",
      externalLink: "https://open.spotify.com/track/6UUmCyNYOBq4fxfbN1sVrK",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "i wish i hated you",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "iwishihatedyou|66CXWjxzNUsdJxJ2JdwvnR|153633",
  song: "song/ariana-grande-i-wish-i-hated-you",
} as const satisfies Track
