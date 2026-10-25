import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const donTGoBreakingMyHeart = {
  id: "01a1749a-259a-7a23-93d0-e3edef84e6f2",
  type: "page-type/movie",
  slug: "don-t-go-breaking-my-heart",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-03-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "793436",
      externalLink: "https://www.themoviedb.org/movie/793436",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Don't Go Breaking My Heart",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt14039046",
  posterPath: "/gUf9RT7QPSbOFEupPzBxpv5knz6.jpg",
  voteAverage: 7.2,
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
