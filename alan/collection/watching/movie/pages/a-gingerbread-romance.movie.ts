import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aGingerbreadRomance = {
  id: "01a17499-e800-7ae8-a4db-b2d0fa6affc8",
  type: "page-type/movie",
  slug: "a-gingerbread-romance",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550033",
      externalLink: "https://www.themoviedb.org/movie/550033",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Gingerbread Romance",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt9028866",
  posterPath: "/mg1YJnLpUbdU1leBYYipqQoTCSw.jpg",
  voteAverage: 5.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
