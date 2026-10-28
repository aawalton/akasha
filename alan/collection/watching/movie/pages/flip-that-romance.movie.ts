import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const flipThatRomance = {
  id: "01a17499-e802-7ae9-a3d8-7414a5b08554",
  type: "page-type/movie",
  slug: "flip-that-romance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-03-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "581310",
      externalLink: "https://www.themoviedb.org/movie/581310",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Flip That Romance",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt9747392",
  posterPath: "/g82ETVLuFCE8JwitEuQmP0jrMUx.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/pluto-tv",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
