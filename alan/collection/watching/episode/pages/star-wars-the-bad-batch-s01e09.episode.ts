import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS01e09 = {
  id: "01a18854-2005-77c0-bdb4-5e80b6280ff1",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s01e09",
  description: "The Batch embark on a rescue mission.",
  ownLength: 29,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-1"],
  position: 9,
  publishedAt: "2021-06-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2923546",
      externalLink: "https://www.themoviedb.org/tv/105971/season/1/episode/9",
    },
  ],
  title: "Bounty Lost",
  episodeType: "standard",
  stillPath: "/7wip4xIEmq27t8sVIKeiB6DXexD.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
