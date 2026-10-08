import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const soloAStarWarsStory = {
  id: "01a06802-6d99-7035-815d-052f70d6fc36",
  type: "page-type/movie",
  slug: "solo-a-star-wars-story",
  title: "Solo: A Star Wars Story",
  partOfCollections: ["fandom/star-wars-2"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-05-25",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/solo-a-star-wars-story-2018",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
