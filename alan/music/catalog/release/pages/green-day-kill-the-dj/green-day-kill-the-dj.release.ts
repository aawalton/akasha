import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayKillTheDj = {
  id: "01a0676a-d722-7042-94a3-3de76516ae5a",
  type: "release",
  slug: "green-day-kill-the-dj",
  title: "Kill the DJ",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 3.714217,
  ownProgress: 3.714217,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "2012-08-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2FHITtPPzRlRMHhGlW2QCp",
      externalLink: "https://open.spotify.com/album/2FHITtPPzRlRMHhGlW2QCp",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
