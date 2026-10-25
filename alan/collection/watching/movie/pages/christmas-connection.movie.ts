import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasConnection = {
  id: "01a17499-c95b-7984-bbd0-78831b7ae048",
  type: "page-type/movie",
  slug: "christmas-connection",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "474994",
      externalLink: "https://www.themoviedb.org/movie/474994",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Connection",
  genres: ["Drama", "TV Movie", "Mystery", "Romance"],
  imdbId: "tt7630836",
  posterPath: "/tFeLk3FgGTO8LahmFdMVAWopvqW.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
