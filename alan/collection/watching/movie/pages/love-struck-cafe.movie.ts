import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveStruckCafe = {
  id: "01a17499-c95d-7a4e-9b59-9835513ecad7",
  type: "page-type/movie",
  slug: "love-struck-cafe",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "479048",
      externalLink: "https://www.themoviedb.org/movie/479048",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love Struck Cafe",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt7520274",
  posterPath: "/nqQBK4QvBXHuemPfuY22S7V0MP7.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
