import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaOneMillionBulletsOneMillionBullets = {
  id: "01a0a59c-3922-747d-920e-e1974c4f5314",
  type: "page-type/track",
  slug: "sia-one-million-bullets-one-million-bullets",
  ownLength: 4.182883333333334,
  ownProgress: 0,
  partOfCollections: ["release/sia-one-million-bullets"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Co5jH9PVxRPmjMPtJy3Z2",
      externalLink: "https://open.spotify.com/track/4Co5jH9PVxRPmjMPtJy3Z2",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "One Million Bullets",
} as const satisfies Track
