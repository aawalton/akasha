import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaFreeMeFreeMe = {
  id: "01a0a59c-352b-7272-812a-be868e5e2d7c",
  type: "track",
  slug: "sia-free-me-free-me",
  ownLength: 4.767816666666667,
  ownProgress: 0,
  partOfCollections: ["release/sia-free-me"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "07tsxA3VTCCs35M17sBs88",
      externalLink: "https://open.spotify.com/track/07tsxA3VTCCs35M17sBs88",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Free Me",
} as const satisfies Track
