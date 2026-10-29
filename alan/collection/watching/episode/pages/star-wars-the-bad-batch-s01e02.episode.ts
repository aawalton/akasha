import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS01e02 = {
  id: "01a18854-2005-7f9b-9bac-f42a5fb59b9b",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s01e02",
  description: "The Bad Batch visit an old contact.",
  ownLength: 32,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-1"],
  position: 2,
  publishedAt: "2021-05-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2754556",
      externalLink: "https://www.themoviedb.org/tv/105971/season/1/episode/2",
    },
  ],
  title: "Cut and Run",
  episodeType: "standard",
  stillPath: "/yU34eav1AT6LZsUY69EzPkkvbwU.jpg",
  voteAverage: 7.426,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
