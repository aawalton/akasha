import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const weddingSeason = {
  id: "01a1749a-66c2-7659-9afc-ccc7cdb3ea1a",
  type: "page-type/movie",
  slug: "wedding-season",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-06-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1119748",
      externalLink: "https://www.themoviedb.org/movie/1119748",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Wedding Season",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt27689885",
  posterPath: "/18deFlzabnUpYNlFUoXUDO1Pp74.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
