import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS01e04 = {
  id: "01a18854-2005-7e3e-bc0d-8c04ed301880",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s01e04",
  description: "The Batch's supply run goes awry.",
  ownLength: 27,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-1"],
  position: 4,
  publishedAt: "2021-05-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2923541",
      externalLink: "https://www.themoviedb.org/tv/105971/season/1/episode/4",
    },
  ],
  title: "Cornered",
  episodeType: "standard",
  stillPath: "/V0VtlwgPjOWT3JowxDuFfiZNvs.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
