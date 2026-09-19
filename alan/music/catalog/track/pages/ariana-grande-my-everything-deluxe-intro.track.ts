import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeIntro = {
  id: "01a0a6c5-2d59-7ca9-9ba5-3fc417762e63",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-intro",
  ownLength: 1.3306666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0qMNPhpRzbghJy6G3SgRag",
      externalLink: "https://open.spotify.com/track/0qMNPhpRzbghJy6G3SgRag",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Intro",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "intro|66CXWjxzNUsdJxJ2JdwvnR|79840",
  song: "song/ariana-grande-intro-2",
} as const satisfies Track
