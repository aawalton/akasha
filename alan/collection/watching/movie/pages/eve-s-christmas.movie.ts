import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const eveSChristmas = {
  id: "01a17497-3825-7d82-836a-ab99f603c98f",
  type: "page-type/movie",
  slug: "eve-s-christmas",
  ownLength: 96,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2004-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "69016",
      externalLink: "https://www.themoviedb.org/movie/69016",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Eve's Christmas",
  genres: ["Drama", "TV Movie", "Fantasy"],
  imdbId: "tt0427224",
  posterPath: "/cpahlixGSaR3Dahs7tCHxMDOF1b.jpg",
  voteAverage: 5.4,
  streamingOn: ["Plex", "Plex Channel", "The Roku Channel", "Tubi TV"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
