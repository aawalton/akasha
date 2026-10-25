import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveUnderTheRainbow = {
  id: "01a17499-e804-74e5-97f9-e09ffda97a9a",
  type: "page-type/movie",
  slug: "love-under-the-rainbow",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-03-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "581316",
      externalLink: "https://www.themoviedb.org/movie/581316",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love Under the Rainbow",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8587730",
  posterPath: "/iW8qQHNnjfCl91rtHCr1zoZNmbA.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
