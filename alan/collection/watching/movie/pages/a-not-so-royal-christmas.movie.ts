import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aNotSoRoyalChristmas = {
  id: "01a1749a-66bb-7dfb-984a-b2dfd85d0ba3",
  type: "page-type/movie",
  slug: "a-not-so-royal-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180747",
      externalLink: "https://www.themoviedb.org/movie/1180747",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Not So Royal Christmas",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt29593677",
  posterPath: "/1OklGsqY6yRplPFnTJwd1fqK9Cl.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
