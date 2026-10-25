import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const playingCupid = {
  id: "01a1749a-259c-71f6-993d-58eb6f35c2c2",
  type: "page-type/movie",
  slug: "playing-cupid",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-02-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "784379",
      externalLink: "https://www.themoviedb.org/movie/784379",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Playing Cupid",
  genres: ["Romance", "TV Movie", "Comedy", "Drama"],
  imdbId: "tt11348956",
  posterPath: "/i6GBlAu8ifBGl69qyL8WpzVlo7V.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
