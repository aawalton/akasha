import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fallingInLoveInNiagara = {
  id: "01a1749a-89a8-7e8c-8712-9f691fff1102",
  type: "page-type/movie",
  slug: "falling-in-love-in-niagara",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-04-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1258379",
      externalLink: "https://www.themoviedb.org/movie/1258379",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Falling in Love in Niagara",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt31727947",
  posterPath: "/lNxbQ7NOEBhba1nn3tMQKXcDjVg.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
