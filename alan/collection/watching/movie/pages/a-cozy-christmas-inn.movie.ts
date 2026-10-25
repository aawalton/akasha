import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aCozyChristmasInn = {
  id: "01a1749a-4648-7dae-aea4-fcd569548d8f",
  type: "page-type/movie",
  slug: "a-cozy-christmas-inn",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1012072",
      externalLink: "https://www.themoviedb.org/movie/1012072",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Cozy Christmas Inn",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt19394150",
  posterPath: "/o39aC3rs6bGA35oN54OalZHbv04.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
