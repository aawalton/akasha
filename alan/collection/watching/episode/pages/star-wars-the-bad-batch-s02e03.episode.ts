import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS02e03 = {
  id: "01a18854-2006-78b0-9840-f366a45a1c5f",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s02e03",
  description: "Clones battle against a Separatist hold out.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-2"],
  position: 3,
  publishedAt: "2023-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4094481",
      externalLink: "https://www.themoviedb.org/tv/105971/season/2/episode/3",
    },
  ],
  title: "The Solitary Clone",
  episodeType: "standard",
  stillPath: "/VO0sRZ11sTrFwN8EOs9Ik1dFYd.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
