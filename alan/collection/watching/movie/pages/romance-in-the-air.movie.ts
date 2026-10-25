import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const romanceInTheAir = {
  id: "01a1749a-06bf-7475-b036-f19978db7646",
  type: "page-type/movie",
  slug: "romance-in-the-air",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-08-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "723266",
      externalLink: "https://www.themoviedb.org/movie/723266",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Romance in the Air",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt12587514",
  posterPath: "/q4l6xkdIC8DUfRSyiuBXFchPp0d.jpg",
  voteAverage: 6.1,
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
