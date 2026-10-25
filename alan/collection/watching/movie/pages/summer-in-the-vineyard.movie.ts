import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const summerInTheVineyard = {
  id: "01a17499-a7d7-7936-8731-9f54a8755f06",
  type: "page-type/movie",
  slug: "summer-in-the-vineyard",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/in-the-vineyard"],
  position: 2,
  publishedAt: "2017-08-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "469773",
      externalLink: "https://www.themoviedb.org/movie/469773",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Summer in the Vineyard",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7042586",
  posterPath: "/1oU8QfjvBOWvzenbtQMC5s8Kc3A.jpg",
  voteAverage: 5.625,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T20:45:04.980Z",
} as const satisfies Movie
