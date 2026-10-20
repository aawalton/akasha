import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaOneMillionBullets = {
  id: "01a0676a-d726-702e-84d8-5416751961f2",
  type: "page-type/release",
  slug: "sia-one-million-bullets",
  title: "One Million Bullets",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 4.182883333333334,
  ownProgress: 4.182883,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-11-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5e3NhKpTMuFHXozhaWfxDw",
      externalLink: "https://open.spotify.com/album/5e3NhKpTMuFHXozhaWfxDw",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Release
