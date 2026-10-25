import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const lettersToSanta = {
  id: "01a1749a-66be-7752-bb5b-87163f29450a",
  type: "page-type/movie",
  slug: "letters-to-santa",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180795",
      externalLink: "https://www.themoviedb.org/movie/1180795",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Letters to Santa",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt27541327",
  posterPath: "/uXAki2M1U5UmMF0idaKUAeBY5Jt.jpg",
  voteAverage: 6.1,
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
