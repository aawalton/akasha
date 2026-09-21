import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineIWishIHatedYou = {
  id: "01a0a6c5-1c10-7036-a521-8de52f1c75e8",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-i-wish-i-hated-you",
  ownLength: 2.56055,
  ownProgress: 2.56055,
  partOfCollections: ["release/ariana-grande-eternal-sunshine"],
  position: 11,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5cQX9BexkPIEESTZijJhXg",
      externalLink: "https://open.spotify.com/track/5cQX9BexkPIEESTZijJhXg",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "i wish i hated you",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "iwishihatedyou|66CXWjxzNUsdJxJ2JdwvnR|153633",
  song: "song/ariana-grande-i-wish-i-hated-you",
  carriedBy: [
    {
      release: "release/ariana-grande-eternal-sunshine",
      discNumber: 1,
      position: 11,
      externalId: "5cQX9BexkPIEESTZijJhXg",
      externalLink: "https://open.spotify.com/track/5cQX9BexkPIEESTZijJhXg",
    },
  ],
} as const satisfies Track
