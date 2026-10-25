import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const friendsFamilyChristmas = {
  id: "01a1749a-89a8-7b39-b651-59397585f6c0",
  type: "page-type/movie",
  slug: "friends-family-christmas",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180706",
      externalLink: "https://www.themoviedb.org/movie/1180706",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Friends & Family Christmas",
  genres: ["Family", "Romance"],
  imdbId: "tt29684873",
  posterPath: "/naLwVZJKN1G4OQatuoMNcHwQDRw.jpg",
  voteAverage: 6.5,
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
