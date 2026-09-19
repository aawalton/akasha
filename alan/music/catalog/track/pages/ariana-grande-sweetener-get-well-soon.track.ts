import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerGetWellSoon = {
  id: "01a0a6c5-2ae4-7460-a202-1a2db6d5c364",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-get-well-soon",
  ownLength: 5.3671,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-sweetener"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7u6DMPznGbpziuEgCE0JGQ",
      externalLink: "https://open.spotify.com/track/7u6DMPznGbpziuEgCE0JGQ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "get well soon",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "getwellsoon|66CXWjxzNUsdJxJ2JdwvnR|322026",
  song: "song/ariana-grande-get-well-soon",
} as const satisfies Track
