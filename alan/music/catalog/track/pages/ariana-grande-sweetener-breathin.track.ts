import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerBreathin = {
  id: "01a0a6c5-2a13-75b0-a770-cb76f46f71c7",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-breathin",
  ownLength: 3.3026666666666666,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-sweetener"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4OafepJy2teCjYJbvFE60J",
      externalLink: "https://open.spotify.com/track/4OafepJy2teCjYJbvFE60J",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "breathin",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "breathin|66CXWjxzNUsdJxJ2JdwvnR|198160",
  song: "song/ariana-grande-breathin",
} as const satisfies Track
