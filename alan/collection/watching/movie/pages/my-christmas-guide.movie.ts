import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myChristmasGuide = {
  id: "01a1749a-89a9-74f4-a087-1c0849d8a889",
  type: "page-type/movie",
  slug: "my-christmas-guide",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180661",
      externalLink: "https://www.themoviedb.org/movie/1180661",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Christmas Guide",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt29353026",
  posterPath: "/sh2DjlKELUbSTGmYEnOrZ2rgfMO.jpg",
  voteAverage: 7,
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
