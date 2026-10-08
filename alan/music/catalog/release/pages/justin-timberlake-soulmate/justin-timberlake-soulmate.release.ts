import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const justinTimberlakeSoulmate = {
  id: "01a0676a-d729-706d-bdd2-6bb82fa488f8",
  type: "page-type/release",
  slug: "justin-timberlake-soulmate",
  title: "SoulMate",
  partOfCollections: ["artist/justin-timberlake"],
  position: 0,
  ownLength: 3.270517,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-07-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2FljC0wx1bLyT6GW3FDQFX",
      externalLink: "https://open.spotify.com/album/2FljC0wx1bLyT6GW3FDQFX",
    },
  ],
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
