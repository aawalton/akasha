import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const branchingOut = {
  id: "01a1749a-89a7-7c6f-b598-0d27887e00f2",
  type: "page-type/movie",
  slug: "branching-out",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-04-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1258761",
      externalLink: "https://www.themoviedb.org/movie/1258761",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Branching Out",
  genres: ["Romance", "Family", "Drama", "Comedy"],
  imdbId: "tt32045638",
  posterPath: "/bKmjlkogYrU6O2uD3jMOMFhYj3O.jpg",
  voteAverage: 7.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
