import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const holidayRoad = {
  id: "01a1749a-66be-75a3-85c4-e057affe817e",
  type: "page-type/movie",
  slug: "holiday-road",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180791",
      externalLink: "https://www.themoviedb.org/movie/1180791",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Holiday Road",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt29233535",
  posterPath: "/4XfxvKm0gAgOFBOL8vguBCiLxiI.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
