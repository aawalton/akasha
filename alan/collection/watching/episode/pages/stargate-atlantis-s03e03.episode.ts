import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e03 = {
  id: "01a18854-82d1-775e-b3fa-44aa4c61561c",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e03",
  description:
    "Sheppard's team meets an obnoxious man who is adored by all thanks to a secret that he carries -- and who has an unexpected effect on them.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 3,
  publishedAt: "2006-07-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168497",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/3",
    },
  ],
  title: "Irresistible",
  episodeType: "standard",
  stillPath: "/g1rubx5yFZU4zcKL5K4x36K0G2W.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
