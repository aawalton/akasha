import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeNasty = {
  id: "01a0a6c5-1fc7-7c3d-b843-e9370b81a34b",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-nasty",
  ownLength: 3.3455333333333335,
  ownProgress: 3.3455333333333335,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  position: 9,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7wcl0YJBQ0ygTUUaXLRM1g",
      externalLink: "https://open.spotify.com/track/7wcl0YJBQ0ygTUUaXLRM1g",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "nasty",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "nasty|66CXWjxzNUsdJxJ2JdwvnR|200732",
  song: "song/ariana-grande-nasty",
  carriedBy: [
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 9,
      externalId: "7wcl0YJBQ0ygTUUaXLRM1g",
      externalLink: "https://open.spotify.com/track/7wcl0YJBQ0ygTUUaXLRM1g",
    },
  ],
} as const satisfies Track
