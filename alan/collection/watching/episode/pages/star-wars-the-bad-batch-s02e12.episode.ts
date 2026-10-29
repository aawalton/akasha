import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS02e12 = {
  id: "01a18854-2006-76ce-a99f-081f1b67453a",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s02e12",
  description: "A new friend is made on a harsh and unforgiving outpost planet.",
  ownLength: 32,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-2"],
  position: 12,
  publishedAt: "2023-03-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4094490",
      externalLink: "https://www.themoviedb.org/tv/105971/season/2/episode/12",
    },
  ],
  title: "The Outpost",
  episodeType: "standard",
  stillPath: "/8PFfg5lOdx8P976WP0ZymdCBQje.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
