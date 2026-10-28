import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS03e06 = {
  id: "01a183d6-3265-7856-a825-b5b85e5bb938",
  type: "page-type/episode",
  slug: "gintama-s03e06",
  description: "The concluding finale to the Shinsengumi Crisis Arc.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-3"],
  position: 6,
  publishedAt: "2008-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940490",
      externalLink: "https://www.themoviedb.org/tv/57041/season/3/episode/6",
    },
  ],
  title: "It’s All About the Beat and Timing",
  episodeType: "standard",
  stillPath: "/qux3rZjzHwh8X8P5Ty4BPIQxU8A.jpg",
  voteAverage: 9.3,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
