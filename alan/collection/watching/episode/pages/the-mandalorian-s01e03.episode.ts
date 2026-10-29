import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS01e03 = {
  id: "01a18885-1cd0-7bbd-91e8-e1efa12f6075",
  type: "page-type/episode",
  slug: "the-mandalorian-s01e03",
  description: "The battered Mandalorian returns to his client for reward.",
  ownLength: 39,
  ownProgress: 39,
  partOfCollections: ["season/the-mandalorian-season-1"],
  position: 3,
  publishedAt: "2019-11-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1980403",
      externalLink: "https://www.themoviedb.org/tv/82856/season/1/episode/3",
    },
  ],
  title: "Chapter 3: The Sin",
  episodeType: "standard",
  stillPath: "/gzunWyk3j7dLbbVUc0CRqlGBxV4.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:36:27.471Z",
  updatedAt: "2026-10-29T16:36:27.471Z",
} as const satisfies Episode
