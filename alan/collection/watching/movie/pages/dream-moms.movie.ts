import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const dreamMoms = {
  id: "01a1749a-66bd-77f4-a88e-1d25b8dde564",
  type: "page-type/movie",
  slug: "dream-moms",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-05-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1106373",
      externalLink: "https://www.themoviedb.org/movie/1106373",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Dream Moms",
  genres: ["TV Movie", "Drama", "Music"],
  imdbId: "tt27357149",
  posterPath: "/6xEMG7PkJ8dqvaTekWpqwbkKsoO.jpg",
  voteAverage: 5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
