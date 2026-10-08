import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const girlInRedSerotonin = {
  id: "01a0676a-d728-7063-89b2-4b317abe55f7",
  type: "page-type/release",
  slug: "girl-in-red-serotonin",
  title: "Serotonin",
  partOfCollections: ["artist/girl-in-red"],
  position: 0,
  ownLength: 3.040433,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-03-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ggmWhoTcBC3o1pWbDoS2T",
      externalLink: "https://open.spotify.com/album/1ggmWhoTcBC3o1pWbDoS2T",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-15T16:35:36.000Z",
} as const satisfies Release
