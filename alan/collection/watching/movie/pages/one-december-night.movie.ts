import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const oneDecemberNight = {
  id: "01a1749a-464c-7579-9212-16252097bf27",
  type: "page-type/movie",
  slug: "one-december-night",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "876444",
      externalLink: "https://www.themoviedb.org/movie/876444",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "One December Night",
  genres: ["TV Movie", "Comedy", "Romance", "Family"],
  imdbId: "tt15397946",
  posterPath: "/jtzju1ZyZOEC6Vr29zqYaxfJAhr.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
