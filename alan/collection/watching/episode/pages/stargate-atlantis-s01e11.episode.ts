import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS01e11 = {
  id: "01a18854-82d0-7b74-9b62-044a207d8a95",
  type: "page-type/episode",
  slug: "stargate-atlantis-s01e11",
  description:
    "Major Sheppard plays a dangerous game of cat and mouse with soldiers who have seized control of Atlantis and taken Weir and McKay hostage.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-1"],
  position: 11,
  publishedAt: "2004-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168455",
      externalLink: "https://www.themoviedb.org/tv/2290/season/1/episode/11",
    },
  ],
  title: "The Eye (2)",
  episodeType: "standard",
  stillPath: "/b6c5Jbs1ME9IJUQrXYr21pXNQ0x.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
