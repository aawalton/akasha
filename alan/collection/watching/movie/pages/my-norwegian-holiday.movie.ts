import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myNorwegianHoliday = {
  id: "01a1749a-66bf-72b6-af10-f1d27a882a39",
  type: "page-type/movie",
  slug: "my-norwegian-holiday",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180750",
      externalLink: "https://www.themoviedb.org/movie/1180750",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Norwegian Holiday",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt29233518",
  posterPath: "/b90FTn3aH8HE4IG1Qu7WOOQSnNG.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
