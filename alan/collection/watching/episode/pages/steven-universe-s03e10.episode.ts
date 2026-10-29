import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e10 = {
  id: "01a18855-67e9-75eb-aed3-e39f2d0ae15f",
  type: "page-type/episode",
  slug: "steven-universe-s03e10",
  description: "Steven gets a new look into Lars' life.",
  ownLength: 11,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 10,
  publishedAt: "2016-07-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1207437",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/10",
    },
  ],
  title: "The New Lars",
  episodeType: "standard",
  stillPath: "/jDaJ0ZXzQVo15drMqRDdT98GfqJ.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
