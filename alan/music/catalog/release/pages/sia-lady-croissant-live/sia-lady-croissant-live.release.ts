import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaLadyCroissantLive = {
  id: "01a0676a-d722-7057-a8e3-13b3fece95c7",
  type: "page-type/release",
  slug: "sia-lady-croissant-live",
  title: "Lady Croissant (Live)",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2007-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6WJcRNkvprk9oyJuiLHT5H",
      externalLink: "https://open.spotify.com/album/6WJcRNkvprk9oyJuiLHT5H",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.274Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
