import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ourChristmasMural = {
  id: "01a1749a-66c0-7517-8c0d-55a817bd955f",
  type: "page-type/movie",
  slug: "our-christmas-mural",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180767",
      externalLink: "https://www.themoviedb.org/movie/1180767",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Our Christmas Mural",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt29513309",
  posterPath: "/yfH3T50DJWjwNAmhYn29UpI4FoB.jpg",
  voteAverage: 6.2,
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
