import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const oneStarryChristmas = {
  id: "01a17499-8948-7495-b0d2-2677945e6f41",
  type: "page-type/movie",
  slug: "one-starry-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2014-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "299574",
      externalLink: "https://www.themoviedb.org/movie/299574",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "One Starry Christmas",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt4159212",
  posterPath: "/lkC12zKrnpiTgOuP72eBfAifIy6.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
