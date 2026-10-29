import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS01e05 = {
  id: "01a18854-2005-70b1-8069-e7ca19bc4259",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s01e05",
  description: "The Batch strike a deal to take on a mission.",
  ownLength: 27,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-1"],
  position: 5,
  publishedAt: "2021-05-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2923542",
      externalLink: "https://www.themoviedb.org/tv/105971/season/1/episode/5",
    },
  ],
  title: "Rampage",
  episodeType: "standard",
  stillPath: "/gf8rmgfrDjnoLlxqKE0uaXpLh1V.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
