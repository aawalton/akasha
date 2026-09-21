import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallLivingForEden = {
  id: "01a0676a-d723-7057-841e-e58386e1e932",
  type: "page-type/release",
  slug: "paul-cardall-living-for-eden",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2008-08-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ensw9MfJd2Uw2RMlNiNUP",
      externalLink: "https://open.spotify.com/album/3ensw9MfJd2Uw2RMlNiNUP",
    },
  ],
  title: "Living For Eden",
} as const satisfies Release
