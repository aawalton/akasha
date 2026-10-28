import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const rescuingChristmas = {
  id: "01a1749a-89aa-7244-bb3f-680c78761e50",
  type: "page-type/movie",
  slug: "rescuing-christmas",
  ownLength: 99,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180656",
      externalLink: "https://www.themoviedb.org/movie/1180656",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Rescuing Christmas",
  genres: ["Comedy", "Romance"],
  imdbId: "tt27491217",
  posterPath: "/znjm4G2QlsT5ofitxBwGOGVKZmy.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
