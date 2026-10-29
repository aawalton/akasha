import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS02e02 = {
  id: "01a18854-2006-75e1-a01e-a55baca8cd00",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s02e02",
  description: "The Batch must decide who to trust as they plan their escape.",
  ownLength: 28,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-2"],
  position: 2,
  publishedAt: "2023-01-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3947857",
      externalLink: "https://www.themoviedb.org/tv/105971/season/2/episode/2",
    },
  ],
  title: "Ruins of War (2)",
  episodeType: "standard",
  stillPath: "/qOrjrR9KWJ1fsbG68gpAgySI17.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
