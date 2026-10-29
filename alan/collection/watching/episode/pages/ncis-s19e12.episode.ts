import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e12 = {
  id: "01a1884b-ef7d-7c40-818e-4f108efc7a04",
  type: "page-type/episode",
  slug: "ncis-s19e12",
  description:
    "When the body of a Navy Lieutenant is discovered missing an eye, the NCIS investigation leads to the world of cage fighting.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 12,
  publishedAt: "2022-01-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3248856",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/12",
    },
  ],
  title: "Fight or Flight",
  episodeType: "standard",
  stillPath: "/zXsOvxGgoGdfPo1DLqpMVITxG1y.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
