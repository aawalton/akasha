import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const meetMeAtChristmas = {
  id: "01a1749a-259b-76eb-8b9f-c223a79f6bca",
  type: "page-type/movie",
  slug: "meet-me-at-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746459",
      externalLink: "https://www.themoviedb.org/movie/746459",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Meet Me at Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13243610",
  posterPath: "/wNFUuf9y9nOUFeRIcepAoLluQdX.jpg",
  voteAverage: 5.9,
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
