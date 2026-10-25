import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInEvergreenTidingsOfJoy = {
  id: "01a1749a-06ba-734e-b4d1-1ebff7a9c8b2",
  type: "page-type/movie",
  slug: "christmas-in-evergreen-tidings-of-joy",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/christmas-in-evergreen"],
  position: 3,
  publishedAt: "2019-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "630921",
      externalLink: "https://www.themoviedb.org/movie/630921",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Evergreen: Tidings of Joy",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10925460",
  posterPath: "/ulLuMX7E9ddrTeLga0SiohrFGwT.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T20:45:10.655Z",
} as const satisfies Movie
