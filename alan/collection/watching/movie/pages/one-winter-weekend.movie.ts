import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const oneWinterWeekend = {
  id: "01a17499-c95e-7ed2-bc61-85ee52b217da",
  type: "page-type/movie",
  slug: "one-winter-weekend",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/one-winter"],
  position: 1,
  publishedAt: "2018-01-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "491411",
      externalLink: "https://www.themoviedb.org/movie/491411",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "One Winter Weekend",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7817348",
  posterPath: "/kgSG5ZMJG0BOUo0BJG7PIeSTwCy.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T20:45:07.643Z",
} as const satisfies Movie
