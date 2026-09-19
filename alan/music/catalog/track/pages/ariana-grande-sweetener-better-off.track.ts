import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerBetterOff = {
  id: "01a0a6c5-2a76-7d39-86de-a14620ba2f01",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-better-off",
  ownLength: 2.85555,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-sweetener"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3NbTQ8ZbHU6MSEVUFAVCJ9",
      externalLink: "https://open.spotify.com/track/3NbTQ8ZbHU6MSEVUFAVCJ9",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "better off",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "betteroff|66CXWjxzNUsdJxJ2JdwvnR|171333",
  song: "song/ariana-grande-better-off",
} as const satisfies Track
