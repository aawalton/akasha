import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS01e01 = {
  id: "01a18854-2005-7fcc-9037-7a99a5508afa",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s01e01",
  description:
    "The clones of The Bad Batch find themselves in a changing galaxy after The Clone Wars.",
  ownLength: 76,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-1"],
  position: 1,
  publishedAt: "2021-05-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2584131",
      externalLink: "https://www.themoviedb.org/tv/105971/season/1/episode/1",
    },
  ],
  title: "Aftermath",
  episodeType: "standard",
  stillPath: "/n4D7u3GEd7CwrTcdfovlddLhLjC.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
