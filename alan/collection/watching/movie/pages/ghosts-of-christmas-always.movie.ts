import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ghostsOfChristmasAlways = {
  id: "01a1749a-464b-7033-b310-a8832b835f5a",
  type: "page-type/movie",
  slug: "ghosts-of-christmas-always",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1027392",
      externalLink: "https://www.themoviedb.org/movie/1027392",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Ghosts of Christmas Always",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt20193354",
  posterPath: "/k0i2CXqOZF5JSp4qejxAxcehmnY.jpg",
  voteAverage: 6.85,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
