import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ourChristmasLoveSong = {
  id: "01a1749a-06be-7ea8-afe5-e91ca8e38e7f",
  type: "page-type/movie",
  slug: "our-christmas-love-song",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "631403",
      externalLink: "https://www.themoviedb.org/movie/631403",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Our Christmas Love Song",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt11171322",
  posterPath: "/y9rOT7fNTGN74FdLe4S9i8saluw.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
