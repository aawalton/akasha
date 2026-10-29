import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS01e13 = {
  id: "01a18854-2005-7a40-818f-dc536d9a6912",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s01e13",
  description: "To save a friend, the Batch plot a mission to sabotage a gangster's operation.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-1"],
  position: 13,
  publishedAt: "2021-07-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2923550",
      externalLink: "https://www.themoviedb.org/tv/105971/season/1/episode/13",
    },
  ],
  title: "Infested",
  episodeType: "standard",
  stillPath: "/4pMLmcFnXwQ8EWQFNerKUYSFFps.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
