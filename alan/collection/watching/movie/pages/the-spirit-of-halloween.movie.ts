import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSpiritOfHalloween = {
  id: "01a1749a-c86b-79e9-92ea-6f4c6cfe26d6",
  type: "page-type/movie",
  slug: "the-spirit-of-halloween",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1744197",
      externalLink: "https://www.themoviedb.org/movie/1744197",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Spirit of Halloween",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt44536662",
  posterPath: "/l2ZtiBj1gzsD0vlnOFcMzKW3Rl2.jpg",
  voteAverage: 4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
