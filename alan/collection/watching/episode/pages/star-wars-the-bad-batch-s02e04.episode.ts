import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS02e04 = {
  id: "01a18854-2006-7a61-8841-b744e3f36d8b",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s02e04",
  description: "The team enters the colorful and dangerous world of racing.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-2"],
  position: 4,
  publishedAt: "2023-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4094482",
      externalLink: "https://www.themoviedb.org/tv/105971/season/2/episode/4",
    },
  ],
  title: "Faster",
  episodeType: "standard",
  stillPath: "/l1AkavWRgZgf6dJRxXFntYWf4ig.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
