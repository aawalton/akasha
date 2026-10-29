import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS01e08 = {
  id: "01a18854-2005-706d-b607-296024e9f2c3",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s01e08",
  description: "The Batch find themselves cornered on treacherous terrain.",
  ownLength: 28,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-1"],
  position: 8,
  publishedAt: "2021-06-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2923545",
      externalLink: "https://www.themoviedb.org/tv/105971/season/1/episode/8",
    },
  ],
  title: "Reunion",
  episodeType: "standard",
  stillPath: "/iTm9InzgBE4FCY1xPzJ8apu3Zkk.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
