import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theLastJedi = {
  id: "01a06802-6d9a-7015-995b-fd0f898496a8",
  type: "page-type/movie",
  slug: "the-last-jedi",
  title: "The Last Jedi",
  partOfCollections: ["fandom/star-wars-2"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-12-15",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-wars-the-last-jedi-2017",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.730Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
