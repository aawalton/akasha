import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenEternity2 = {
  id: "01a0676a-d71d-702b-b306-379649ad7e6c",
  type: "page-type/release",
  slug: "alex-warren-eternity-2",
  title: "Eternity",
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-07-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4YWCFYaGuMnatl2Ppdmvy5",
      externalLink: "https://open.spotify.com/album/4YWCFYaGuMnatl2Ppdmvy5",
      lastSyncedAt: "2026-01-14",
    },
  ],
  createdAt: "2026-09-03T13:17:30.269Z",
  updatedAt: "2026-10-16T14:00:31.585Z",
} as const satisfies Release
