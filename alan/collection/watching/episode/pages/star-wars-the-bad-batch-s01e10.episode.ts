import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS01e10 = {
  id: "01a18854-2005-71b5-b230-73cf665bf64b",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s01e10",
  description: "The Batch has their ideology challenged.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-1"],
  position: 10,
  publishedAt: "2021-07-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2923547",
      externalLink: "https://www.themoviedb.org/tv/105971/season/1/episode/10",
    },
  ],
  title: "Common Ground",
  episodeType: "standard",
  stillPath: "/ycVqiufBfq3NpZjmmiaZDTaGh6v.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
