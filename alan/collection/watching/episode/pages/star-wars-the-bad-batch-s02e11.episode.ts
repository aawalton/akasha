import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS02e11 = {
  id: "01a18854-2006-7a07-a9dc-2903ee637c14",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s02e11",
  description: "The Batch finds a mysterious missing vessel.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-2"],
  position: 11,
  publishedAt: "2023-03-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4094489",
      externalLink: "https://www.themoviedb.org/tv/105971/season/2/episode/11",
    },
  ],
  title: "Metamorphosis",
  episodeType: "standard",
  stillPath: "/xxcDjC2FaLPXahAlk1WhQnoEg3B.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
