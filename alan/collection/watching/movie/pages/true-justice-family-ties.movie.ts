import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const trueJusticeFamilyTies = {
  id: "01a1749a-a94e-76c2-8a6e-4e3912453795",
  type: "page-type/movie",
  slug: "true-justice-family-ties",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/true-justice"],
  position: 1,
  publishedAt: "2024-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1212670",
      externalLink: "https://www.themoviedb.org/movie/1212670",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "True Justice: Family Ties",
  genres: ["TV Movie", "Mystery", "Crime"],
  imdbId: "tt30646084",
  posterPath: "/pN7VxfVY0dtgcoaA1CD3dir649U.jpg",
  voteAverage: 7.306,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T20:45:25.537Z",
} as const satisfies Movie
