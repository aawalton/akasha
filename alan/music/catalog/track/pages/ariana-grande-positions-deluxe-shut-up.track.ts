import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeShutUp = {
  id: "01a0a6c5-1edd-73b6-ad19-a36da976dc48",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-shut-up",
  ownLength: 2.6285,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "12sliObzVzbLbAlDb8eChf",
      externalLink: "https://open.spotify.com/track/12sliObzVzbLbAlDb8eChf",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "shut up",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "shutup|66CXWjxzNUsdJxJ2JdwvnR|157710",
} as const satisfies Track
