import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aVeryVermontChristmas = {
  id: "01a1749a-89a6-71ad-b42c-ca3b7315f0de",
  type: "page-type/movie",
  slug: "a-very-vermont-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-07-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1298474",
      externalLink: "https://www.themoviedb.org/movie/1298474",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Very Vermont Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt32011613",
  posterPath: "/jq6MRHpWogSJDiElTRhLgVrXpaQ.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
