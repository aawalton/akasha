import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const iDoIDoIDo = {
  id: "01a17499-8945-7dc3-b8a3-5e1aa8a30874",
  type: "page-type/movie",
  slug: "i-do-i-do-i-do",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "317118",
      externalLink: "https://www.themoviedb.org/movie/317118",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "I Do, I Do, I Do",
  genres: ["Romance", "Comedy", "Fantasy", "TV Movie"],
  imdbId: "tt4380748",
  posterPath: "/kgC8KPpl8z2EhKtc5eY2svyGHTB.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
