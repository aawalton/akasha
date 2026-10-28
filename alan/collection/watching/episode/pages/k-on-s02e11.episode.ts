import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS02e11 = {
  id: "01a183da-447a-719a-a87d-034a9ef43880",
  type: "page-type/episode",
  slug: "k-on-s02e11",
  description:
    "An exceptionally hot day launches a crusade to have air conditioning installed in the club room.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-2"],
  position: 11,
  publishedAt: "2010-06-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879111",
      externalLink: "https://www.themoviedb.org/tv/42253/season/2/episode/11",
    },
  ],
  title: "Hot!",
  episodeType: "standard",
  stillPath: "/uqb6nFHlybK051OZMqC4qJ9j4X2.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
