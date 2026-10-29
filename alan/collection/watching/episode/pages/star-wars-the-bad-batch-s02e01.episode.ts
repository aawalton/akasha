import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS02e01 = {
  id: "01a18854-2006-7e5e-a0d9-a8269487cbfd",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s02e01",
  description: "The Bad Batch plans a risky heist.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-2"],
  position: 1,
  publishedAt: "2023-01-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3760472",
      externalLink: "https://www.themoviedb.org/tv/105971/season/2/episode/1",
    },
  ],
  title: "Spoils of War (1)",
  episodeType: "standard",
  stillPath: "/sun5Xq2ua746j3kb5Fsf1zTk6X3.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
