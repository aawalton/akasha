import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS03e11 = {
  id: "01a18854-2007-7af6-917d-2ad64a075b2d",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s03e11",
  description: "The Empire closes in on the Batch.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-3"],
  position: 11,
  publishedAt: "2024-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5093243",
      externalLink: "https://www.themoviedb.org/tv/105971/season/3/episode/11",
    },
  ],
  title: "Point of No Return",
  episodeType: "standard",
  stillPath: "/goX5QvJiWrdHcmaJIczw3a2LSDN.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
