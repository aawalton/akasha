import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e13 = {
  id: "01a1884b-ef6a-73ea-a727-a5ae6451449e",
  type: "page-type/episode",
  slug: "ncis-s07e13",
  description:
    "While on the flight back from Paris, Tony and Ziva realize that their assignment to protect a government witness in an embezzlement case is in great danger when they learn that an assassin is located on the same flight.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 13,
  publishedAt: "2010-01-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334563",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/13",
    },
  ],
  title: "Jet Lag",
  episodeType: "standard",
  stillPath: "/l4bLrOXIEj4clnfv5iVC6rxGKKA.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
