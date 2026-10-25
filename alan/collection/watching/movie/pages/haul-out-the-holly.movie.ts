import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const haulOutTheHolly = {
  id: "01a1749a-464b-7ccb-9d7f-1d0cb7839d0d",
  type: "page-type/movie",
  slug: "haul-out-the-holly",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/haul-out-the-holly"],
  position: 1,
  publishedAt: "2022-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028556",
      externalLink: "https://www.themoviedb.org/movie/1028556",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Haul Out the Holly",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt21359036",
  posterPath: "/naX9S52wyTpUJPR80FIWhgxzufb.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T20:45:19.452Z",
} as const satisfies Movie
