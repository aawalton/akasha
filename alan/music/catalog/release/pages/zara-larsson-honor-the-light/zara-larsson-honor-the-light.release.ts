import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonHonorTheLight = {
  id: "01a0676a-d720-705a-84ac-5bce400b7c2b",
  type: "page-type/release",
  slug: "zara-larsson-honor-the-light",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2023-12-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Nxzeq5f7m7kpCP8PtWFPm",
      externalLink: "https://open.spotify.com/album/1Nxzeq5f7m7kpCP8PtWFPm",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Honor The Light",
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
