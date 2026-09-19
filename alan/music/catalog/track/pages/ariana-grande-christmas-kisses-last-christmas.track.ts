import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasKissesLastChristmas = {
  id: "01a0a6c5-3e04-7940-b3d9-d6470d41c338",
  type: "page-type/track",
  slug: "ariana-grande-christmas-kisses-last-christmas",
  ownLength: 3.394216666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-christmas-kisses"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5xDrO9DEDJGUQGfyoHvgDJ",
      externalLink: "https://open.spotify.com/track/5xDrO9DEDJGUQGfyoHvgDJ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Last Christmas",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "lastchristmas|66CXWjxzNUsdJxJ2JdwvnR|203653",
  song: "song/taylor-swift-last-christmas",
} as const satisfies Track
