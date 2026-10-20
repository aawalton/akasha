import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaAlive = {
  id: "01a0676a-d716-7015-ad6d-f20711cea744",
  type: "page-type/release",
  slug: "sia-alive",
  title: "Alive",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-09-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1dWhND56sMmlCvxdUytMxZ",
      externalLink: "https://open.spotify.com/album/1dWhND56sMmlCvxdUytMxZ",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.262Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
