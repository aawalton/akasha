import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const farewellMrKringle = {
  id: "01a17499-470c-7512-bc0f-6b91d22e6633",
  type: "page-type/movie",
  slug: "farewell-mr-kringle",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "144256",
      externalLink: "https://www.themoviedb.org/movie/144256",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Farewell Mr. Kringle",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt1646894",
  posterPath: "/vy8dZmK50VZN2zXeEc3ZAV6S26V.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
