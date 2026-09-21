import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallSeptemberWinds = {
  id: "01a0676a-d728-7061-8838-1222364b4d1a",
  type: "page-type/release",
  slug: "paul-cardall-september-winds",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2021-09-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Qflkxt8CZCgRyR1dbL8cN",
      externalLink: "https://open.spotify.com/album/3Qflkxt8CZCgRyR1dbL8cN",
    },
  ],
  title: "September Winds",
} as const satisfies Release
