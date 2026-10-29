import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e02 = {
  id: "01a1884b-ef7b-7983-a6f4-060df7f9fede",
  type: "page-type/episode",
  slug: "ncis-s19e02",
  description:
    "While trying to find the serial killer Gibbs was after, the NCIS team discovers another person has been tracking the case as well.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 2,
  publishedAt: "2021-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3187322",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/2",
    },
  ],
  title: "Nearly Departed",
  episodeType: "standard",
  stillPath: "/txdEWLibheWMEb00P8pYoNch4gz.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
