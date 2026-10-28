import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const northpole = {
  id: "01a17499-8947-7425-887e-5125e4797b40",
  type: "page-type/movie",
  slug: "northpole",
  ownLength: 81,
  ownProgress: 0,
  partOfCollections: ["franchise/northpole"],
  position: 1,
  publishedAt: "2014-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "299579",
      externalLink: "https://www.themoviedb.org/movie/299579",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Northpole_(film)" },
  ],
  title: "Northpole",
  genres: ["TV Movie", "Fantasy", "Family"],
  imdbId: "tt3595848",
  posterPath: "/1J0eisyWjmaZLXYDszjWbNpnKt9.jpg",
  voteAverage: 5.969,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
