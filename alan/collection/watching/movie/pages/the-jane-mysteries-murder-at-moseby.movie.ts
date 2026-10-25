import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theJaneMysteriesMurderAtMoseby = {
  id: "01a1749a-a94d-79ed-a81a-2fcdbc307028",
  type: "page-type/movie",
  slug: "the-jane-mysteries-murder-at-moseby",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["franchise/the-jane-mysteries"],
  position: 3,
  publishedAt: "2024-09-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1329925",
      externalLink: "https://www.themoviedb.org/movie/1329925",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Jane Mysteries: Murder at Moseby",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt33132312",
  posterPath: "/witEJXV9I2RbWxxYKJkGmA1RsMs.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T20:45:28.240Z",
} as const satisfies Movie
