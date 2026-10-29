import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS01e11 = {
  id: "01a18854-2005-7d35-ae9f-5df9ca354f4e",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s01e11",
  description:
    "As the seeds of rebellion foment on an outer rim world, the Empire schemes to squash it.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-1"],
  position: 11,
  publishedAt: "2021-07-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2923548",
      externalLink: "https://www.themoviedb.org/tv/105971/season/1/episode/11",
    },
  ],
  title: "Devil's Deal",
  episodeType: "standard",
  stillPath: "/rDXzJgycUkmfi4fbtW9GlGPVijV.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
