import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const itSChristmasEve = {
  id: "01a17499-c95d-7768-8a34-907822fedada",
  type: "page-type/movie",
  slug: "it-s-christmas-eve",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "535807",
      externalLink: "https://www.themoviedb.org/movie/535807",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "It's Christmas, Eve",
  genres: ["Romance", "Drama", "TV Movie", "Music"],
  imdbId: "tt8300786",
  posterPath: "/pEDSCMBX1dgEtPZQEWkHF1aunzi.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
