import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS01e03 = {
  id: "01a18854-2005-7ba8-b2c4-02e1b5e29495",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s01e03",
  description: "The Batch get stuck on a desolate moon.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-1"],
  position: 3,
  publishedAt: "2021-05-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2902771",
      externalLink: "https://www.themoviedb.org/tv/105971/season/1/episode/3",
    },
  ],
  title: "Replacements",
  episodeType: "standard",
  stillPath: "/5zlVjk6XaOPZIt5cWEqoLSmDjTn.jpg",
  voteAverage: 7.54,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
