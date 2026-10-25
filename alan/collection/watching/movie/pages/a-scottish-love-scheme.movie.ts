import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aScottishLoveScheme = {
  id: "01a1749a-89a6-7511-8ce0-76c5c4d44a50",
  type: "page-type/movie",
  slug: "a-scottish-love-scheme",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1212662",
      externalLink: "https://www.themoviedb.org/movie/1212662",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Scottish Love Scheme",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt28787545",
  posterPath: "/mU27y1agaBDnDWgc3ypm1b2qNC0.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
