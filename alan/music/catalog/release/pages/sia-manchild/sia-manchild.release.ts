import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaManchild = {
  id: "01a0676a-d724-7035-97ee-44ba72bb2d89",
  type: "page-type/release",
  slug: "sia-manchild",
  title: "Manchild",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-04-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4T3bAELPl0l8HhqKMp7Z8I",
      externalLink: "https://open.spotify.com/album/4T3bAELPl0l8HhqKMp7Z8I",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
