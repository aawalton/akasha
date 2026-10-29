import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e21 = {
  id: "01a1884b-ef75-7af0-979d-b057b580cb1a",
  type: "page-type/episode",
  slug: "ncis-s14e21",
  description:
    "A Marine's murder has connections to a dirt bike gang that Torres joined while on an old undercover operation.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 21,
  publishedAt: "2017-04-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1298643",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/21",
    },
  ],
  title: "One Book, Two Covers",
  episodeType: "standard",
  stillPath: "/xm1xeEtd9KVpF2JQpQKQlZi7kwP.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
