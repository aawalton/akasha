import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e13 = {
  id: "01a1884b-ef82-7622-b11b-11202822cd5d",
  type: "page-type/episode",
  slug: "ncis-s20e13",
  description:
    "In preparation for a role, a world-renowned actress shadows the NCIS team as they investigate a decapitation case.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 13,
  publishedAt: "2023-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4163079",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/13",
    },
  ],
  title: "Evil Eye",
  episodeType: "standard",
  stillPath: "/89NzBpwWjWo7maoAlE38kCEcriK.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
