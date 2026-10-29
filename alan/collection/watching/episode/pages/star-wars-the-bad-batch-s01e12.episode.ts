import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS01e12 = {
  id: "01a18854-2005-752a-b4af-499593bb73c5",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s01e12",
  description: "The Batch is tasked with a dangerous mission.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-1"],
  position: 12,
  publishedAt: "2021-07-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2923549",
      externalLink: "https://www.themoviedb.org/tv/105971/season/1/episode/12",
    },
  ],
  title: "Rescue on Ryloth",
  episodeType: "standard",
  stillPath: "/U5E3G7Eb5aEoi3Za1lSSFEKSTX.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
