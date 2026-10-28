import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS02e01 = {
  id: "01a183d6-3262-7f49-a8c5-3ea0ce6b1300",
  type: "page-type/episode",
  slug: "gintama-s02e01",
  description: "The cast goes over their ideas for the series' new direction.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-2"],
  position: 1,
  publishedAt: "2007-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940366",
      externalLink: "https://www.themoviedb.org/tv/57041/season/2/episode/1",
    },
  ],
  title: "Pending Means Pending, It's Not Final",
  episodeType: "standard",
  stillPath: "/8SORP8cOnEFbOC37zC9BvIA5kDh.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
