import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS03e01 = {
  id: "01a18854-2007-74d0-b656-2a61fd47b595",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s03e01",
  description: "Imprisoned on Tantiss, Omega adjusts to a new life.",
  ownLength: 33,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-3"],
  position: 1,
  publishedAt: "2024-02-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5093227",
      externalLink: "https://www.themoviedb.org/tv/105971/season/3/episode/1",
    },
  ],
  title: "Confined",
  episodeType: "standard",
  stillPath: "/jXpojVFPOHH6plZ9OhNr489boxg.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
