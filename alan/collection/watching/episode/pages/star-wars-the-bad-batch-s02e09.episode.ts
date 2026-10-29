import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS02e09 = {
  id: "01a18854-2006-7446-92b4-00890c4b6eae",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s02e09",
  description: "The team tackles a risky mission on a hostile world.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-2"],
  position: 9,
  publishedAt: "2023-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4094487",
      externalLink: "https://www.themoviedb.org/tv/105971/season/2/episode/9",
    },
  ],
  title: "The Crossing",
  episodeType: "standard",
  stillPath: "/hX7JAwHXdWfOLhjl1KlYokrZsm7.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
