import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e04 = {
  id: "01a1884b-ef79-7bc1-9cc4-9b323229efa6",
  type: "page-type/episode",
  slug: "ncis-s17e04",
  description:
    "The NCIS team links a bizarre crime scene at Arlington National Cemetery to a string of attacks on homeless veterans.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 4,
  publishedAt: "2019-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1953590",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/4",
    },
  ],
  title: "Someone Else's Shoes",
  episodeType: "standard",
  stillPath: "/4QBC9gxrNJ8QxgK9UAb3nJXjvF5.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
