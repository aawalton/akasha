import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const coyoteCreekChristmas = {
  id: "01a1749a-259a-77db-b6ec-0bd0a60a298c",
  type: "page-type/movie",
  slug: "coyote-creek-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874127",
      externalLink: "https://www.themoviedb.org/movie/874127",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Coyote Creek Christmas",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt15205430",
  posterPath: "/m2p5fffaFToQM1gmNdF4MxyjuL6.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
