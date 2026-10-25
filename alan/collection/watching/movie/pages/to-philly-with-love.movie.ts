import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const toPhillyWithLove = {
  id: "01a1749a-c86c-7a51-a58d-f1cdc57bcd42",
  type: "page-type/movie",
  slug: "to-philly-with-love",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-04-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1645241",
      externalLink: "https://www.themoviedb.org/movie/1645241",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "To Philly with Love",
  genres: ["Romance"],
  imdbId: "tt40336528",
  posterPath: "/hr7AI4AnkucXPaYdoMXN2CSjMax.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
