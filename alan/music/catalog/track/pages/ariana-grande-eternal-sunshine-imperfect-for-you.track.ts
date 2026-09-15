import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineImperfectForYou = {
  id: "01a0a6c5-1c2f-7112-9ac7-2c6fa69ff4b8",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-imperfect-for-you",
  ownLength: 3.0427666666666666,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6XXKB32Om6WuXg3uEWwTob",
      externalLink: "https://open.spotify.com/track/6XXKB32Om6WuXg3uEWwTob",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "imperfect for you",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "imperfectforyou|66CXWjxzNUsdJxJ2JdwvnR|182566",
} as const satisfies Track
