import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS03e05 = {
  id: "01a18854-2007-7185-b0ca-88bb07e0a715",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s03e05",
  description: "Tensions rise as our heroes navigate new dynamics on a dangerous mission.",
  ownLength: 27,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-3"],
  position: 5,
  publishedAt: "2024-03-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5093233",
      externalLink: "https://www.themoviedb.org/tv/105971/season/3/episode/5",
    },
  ],
  title: "The Return",
  episodeType: "standard",
  stillPath: "/h6iGd16fLPmLlI5Evlqw2e13uO5.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
