import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS01e06 = {
  id: "01a18854-2005-74cc-9688-40bcd89e57a0",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s01e06",
  description:
    "On a mission to acquire valuable asset, The Batch encounter smugglers after the same target.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-1"],
  position: 6,
  publishedAt: "2021-06-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2923543",
      externalLink: "https://www.themoviedb.org/tv/105971/season/1/episode/6",
    },
  ],
  title: "Decommissioned",
  episodeType: "standard",
  stillPath: "/xrXtD0EzqrBoTSDsRBM023skZtq.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
