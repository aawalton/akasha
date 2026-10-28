import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aNashvilleChristmasCarol = {
  id: "01a1749a-06b9-7c1e-a154-d29349e4e97b",
  type: "page-type/movie",
  slug: "a-nashville-christmas-carol",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746041",
      externalLink: "https://www.themoviedb.org/movie/746041",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Nashville Christmas Carol",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt13341432",
  posterPath: "/jsEfHhRudgiZfjdgaDUP80IYe9X.jpg",
  voteAverage: 6.658,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
