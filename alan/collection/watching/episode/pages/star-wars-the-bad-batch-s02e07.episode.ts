import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS02e07 = {
  id: "01a18854-2006-7947-9ccf-457fab887ec5",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s02e07",
  description: "A conspiracy begins to unravel.",
  ownLength: 29,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-2"],
  position: 7,
  publishedAt: "2023-02-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4094485",
      externalLink: "https://www.themoviedb.org/tv/105971/season/2/episode/7",
    },
  ],
  title: "The Clone Conspiracy (1)",
  episodeType: "standard",
  stillPath: "/kFdFTQNMO3sssWGqI94EbK3eXCf.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
