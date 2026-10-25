import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInEvergreenLettersToSanta = {
  id: "01a17499-e802-7c9f-80ee-a7e217b8d4b2",
  type: "page-type/movie",
  slug: "christmas-in-evergreen-letters-to-santa",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/christmas-in-evergreen"],
  position: 1,
  publishedAt: "2018-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550025",
      externalLink: "https://www.themoviedb.org/movie/550025",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Evergreen: Letters to Santa",
  genres: ["Family", "Romance", "TV Movie"],
  imdbId: "tt9033634",
  posterPath: "/c7sbYi97TdjSPwUboF802yWidPP.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
