import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const takingTheReins = {
  id: "01a1749a-259d-7f72-a7c4-aaabf250dfcf",
  type: "page-type/movie",
  slug: "taking-the-reins",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "858910",
      externalLink: "https://www.themoviedb.org/movie/858910",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Taking the Reins",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt15112934",
  posterPath: "/wQA4Snh9ZPB2Rhzcu9ojVMR71Bd.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
