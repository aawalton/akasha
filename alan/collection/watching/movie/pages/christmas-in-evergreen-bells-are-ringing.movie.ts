import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInEvergreenBellsAreRinging = {
  id: "01a1749a-2599-740b-9bd7-e122b94ca800",
  type: "page-type/movie",
  slug: "christmas-in-evergreen-bells-are-ringing",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/christmas-in-evergreen"],
  position: 4,
  publishedAt: "2020-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746047",
      externalLink: "https://www.themoviedb.org/movie/746047",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Evergreen: Bells are Ringing",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13194940",
  posterPath: "/myeWipLioMj5vtflpg5IEiBsaPx.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T20:45:13.587Z",
} as const satisfies Movie
