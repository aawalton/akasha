import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasSail = {
  id: "01a1749a-2599-7639-a073-2dbf0a54a662",
  type: "page-type/movie",
  slug: "christmas-sail",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-10-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874228",
      externalLink: "https://www.themoviedb.org/movie/874228",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Sail",
  genres: ["Comedy", "Romance", "TV Movie", "Drama"],
  imdbId: "tt15758364",
  posterPath: "/l1hEbHfFI4UCW3X5MBtommRcOcQ.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
