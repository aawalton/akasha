import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const smooch = {
  id: "01a17499-470e-777a-a6f9-574c7b254666",
  type: "page-type/movie",
  slug: "smooch",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-02-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "129120",
      externalLink: "https://www.themoviedb.org/movie/129120",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Smooch",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt1754513",
  posterPath: "/rgh93XxCdrX0dduLkJtf1FoV8Nn.jpg",
  voteAverage: 6,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
