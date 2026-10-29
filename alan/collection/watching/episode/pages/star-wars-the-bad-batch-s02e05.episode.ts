import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS02e05 = {
  id: "01a18854-2006-7dd9-bfc1-c06a7e037172",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s02e05",
  description: "The Batch searches for an ancient treasure that stirs up a shocking surprise.",
  ownLength: 29,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-2"],
  position: 5,
  publishedAt: "2023-01-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4094483",
      externalLink: "https://www.themoviedb.org/tv/105971/season/2/episode/5",
    },
  ],
  title: "Entombed",
  episodeType: "standard",
  stillPath: "/fMG4478ksDN9qgxUWKhU3orlSsH.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
